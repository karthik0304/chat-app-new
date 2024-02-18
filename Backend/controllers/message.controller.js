import Conversation from "../models/conversation.models.js";
import Message from "../models/messages.model.js";

export const sendMessage = async(req,res)=>{
   
    try {
        const {message}= req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId , receiverId]},
        });

        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId , receiverId] ,
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
           
        }
        
        //socket functionality code 
        
        // await conversation.save();
        // await newMessage.save();

        //this will run parallelly 
        await Promise.all([conversation.save() , newMessage.save()])
        
        res.status(200).json(newMessage);



    } catch (error) {
        console.log(error);
        res.status(500).json("internal error in message  controller");
    }
}


export  const getMessage = async(req,res)=>{

    try {

        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId , userToChatId]}
        }).populate("messages"); 

        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("error at  get message",error.message);
        res.status(500).json("internal server error");
    }
}