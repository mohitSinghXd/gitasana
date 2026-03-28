import User from "../Model/user.model.js";

export const getuser= async(req ,res)=>{
        try { 
            const userid   = req.userId
            if(!userid) return res.status(403).json({message :"userid doesnot exist"})  ; 
             const getuser =  await User.findOne({_id: userid}) ; 
             if(!getuser) return res.status(400).json({message: "no user found"}) ; 
             res.status(200).json({user : getuser})
        } catch (error) {  
            res.status(500).json({message : "server error"}) ; 
            
        }
} 