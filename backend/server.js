import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js'
import dotenv  from 'dotenv';
import connectMongoDB from './database/connectMongoDB.js';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 5000;

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.listen(PORT,()=>{
    console.log("Server is running")
    connectMongoDB();
})

