import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import dotenv  from 'dotenv';
import connectMongoDB from './database/connectMongoDB.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 5000;

app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    console.log("Server is running")
    connectMongoDB();
})