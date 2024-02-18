import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js';


import dbconnection from './config/dbconnection.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbconnection();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/user" , userRoutes);



app.listen(PORT , ()=>{
    console.log(`app is listening at port ${PORT}`)
})