import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["Male" ,"Female" ,"Others"],
    },
    profilePic:{
        type:String,
        default:"",
    }
});


const User = mongoose.model("User" , userSchema);

export default User;