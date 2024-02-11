import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/auth.routes.js'
import dbconnection from './config/dbconnection.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbconnection();

app.use(express.json());
app.use("/api/auth" , userRoutes);


app.listen(PORT , ()=>{
    console.log(`app is listening at port ${PORT}`)
})