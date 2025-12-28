import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
 
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js';
const app=express();
const port=process.env.port ||4000;
app.use(cors({
  origin: "*"
}));
connectDB()
// middleware
app.use(express.json());

app.get('/',(req,res)=>{
   res.send('API is running...');
})
//routes
import taskRoutes from './routes/TaskRoute.js';
app.use('/api',taskRoutes);

app.listen(port,(req,res)=>{
   console.log(`server is  running on port ${port}`);
})
