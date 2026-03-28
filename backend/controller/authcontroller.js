import User from "../Model/user.model.js";
import { genereateAccessToken, genereateRefreshToken } from "../utility/generatetoken.js";


export  const Signup= async(req ,res)=>{ 
    try {
        const {username , password , gmail} = req.body ; 
       if(!username ||  !password || !gmail)return res.status(400).json({message : "all fields required"})  ; 
        if(password.length <  6 ) return res.status(400).json({message  :"password must be atleast 6 characters"})  ;  
         const newUser = await User.create({username ,password , gmail}) ;  
           const accessToken = genereateAccessToken(newUser._id)  ; 
           const refershToken = genereateRefreshToken(newUser._id)  ;  
            
           const options ={
            httpOnly : true , 
            sameSite : "lax" , 
            secure : true  , 
            maxAge :8*24*60*60*1000
           } 

           res.status(201).cookie("refreshToken" , refershToken  ,options).json({message : "user created" , user: newUser  , accessToken : accessToken })
    } catch (error) { 
        res.status(500).json({message  : "something went wrong from server" , error  : error.message
        })
        
    }

} 


