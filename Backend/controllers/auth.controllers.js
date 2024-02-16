import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async(req,res)=>{
    try{

        const{firstName, lastName , username , password,confirmPassword, gender, profilePic} = req.body;
        if(!firstName|| !lastName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json("all fields are required");
        }
        if(password  !== confirmPassword){
            return res.status(400).json("incorrect password");
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json("User Already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password , salt);

        const userprofilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}` ;

        const newUser = new User({
            firstName,
            lastName,
            username,
            password:hashedPassword,
            gender,
            profilePic:userprofilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser ,res);
            await newUser.save();
            res.status(200).json({
                success:true,
                data:newUser,
                message:"user created succesfully"
            })
        }
        else{
            return res.status(201).json("unable to create a user");
        }
      
    }catch(error){
        res.status(201).json({
            success:false,
            message:error,
        })
    }
}



export const login= async(req,res)=>{
    try{
        const { username , password} = req.body ;
        const user = await User.findOne({username}) ;
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user , !isPasswordCorrect){
            return res.status(400).json({error:"invalid username or password"});
        }

        generateTokenAndSetCookie(user._id , res);

        res.status(200).json({
            success:true ,
            data:user
        })
    }catch(error){
        res.status(201).json({
            success:false,
            message:error,
        })
    }

}



export const logout=(req,res)=>{
   try {
    res.cookie('jwt' , "" ,{maxAge:"0"})
    res.status(200).json("logout sucessfully")
   }catch(error){
    res.status(201).json({
        success:false,
        message:error,
    })
}
}