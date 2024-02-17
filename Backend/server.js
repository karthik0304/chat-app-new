import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dbconnection from './config/dbconnection.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbconnection();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , userRoutes);
app.use("/api/messages" , messageRoutes);


app.listen(PORT , ()=>{
    console.log(`app is listening at port ${PORT}`)
})