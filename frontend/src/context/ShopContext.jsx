import { createContext, useEffect, useState } from 'react';
// import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// The createContext API in React is used to manage global state and allow data to 
// be shared easily across multiple components without having to pass props down 
// through each level of the component tree.

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [showSearch, setShowsearch] = useState(false)
    const [token, setToken] = useState('')
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = async (itemId,size) => {
        let cartData = structuredClone(cartItems)

        if(!size){
            toast.error('Select Product Size')
            return
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)


        if(token){
            try {

                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})

            } catch (error) {

                console.log(error)
                toast.error(error.message)
                
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    return (error)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        
        let cartData = structuredClone(cartItems)
        
        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            if(response.data.cartData){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getCartAmount = () => {

        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items)

            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, delivery_fee, currency, search, setSearch, showSearch, token, setToken, setCartItems,
        setShowsearch, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider