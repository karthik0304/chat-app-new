import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute=  async(req,res,next)=>{

   try {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json("token not found");
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    if(!decoded){
        res.status(401).json("invalid token");
    }
    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).josn("user not found");
    }
    req.user=user;

    next();

   } catch (error) {
    console.log(error.message);
    res.status(500).json("internal error in protected route");
   }
}

export default  protectRoute;