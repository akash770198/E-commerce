import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// app config
const app = express();
const port = process.env.PORT || 3000;
connectDB()
connectCloudinary()

// middlewares
app.use(cors());
app.use(express.json());

// api end-points
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res) => {
    res.send('API working')
})

app.listen(port, () => {
    console.log(`App running successfully on port : ${port}`)
})