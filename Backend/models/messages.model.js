import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiver:{
        type: mongoose.Schema.type.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },

},
//createdat and updated at 
{timestamps:true}
);

const Message = mongoose.Model("Message" , messageSchema);

export default Message;