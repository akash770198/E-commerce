import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentstate] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if(currentState === 'Sign Up'){

        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
        // console.log(response.data)
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        console.log(response.data)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular  text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>

      {currentState === 'Sign Up' ? <input onChange={(e)=>setName(e.target.value)} type="text" className="w-full px-3 py-2 b border border-gray-800" placeholder="Name" required/> : ''}
      <input type="email" onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 b border border-gray-800" placeholder="Email" required/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 b border border-gray-800" placeholder="Password" required/>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login' ? 
          <p onClick={()=>setCurrentstate('Sign Up')} className="cursor-pointer">New User?</p> : <p onClick={()=>setCurrentstate('Login')} className="cursor-pointer">Already have an account?</p>
        }
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === 'Login' ? `Login` : `Sign Up`}</button>
    </form>
  )
}

export default Login