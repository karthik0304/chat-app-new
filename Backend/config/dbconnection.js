import mongoose from "mongoose";

const DbConnect = async()=>{

    try{
        await mongoose.connect(process.env.MONGO)
            console.log("db connected succesfully");
    }catch(error){
        console.log(error);
        console.log("db connection failed");
    }
}

export default DbConnect;