
import jwt from "jsonwebtoken"
export const isauth =async(req ,res , next)=>{  
    try { 
        const token = req.cookies.token ; 
        if(!token) return res.status(403).json({message :"no token found"})  ; 
        
        const decoded = jwt.verify(token  , process.env.ACCESS_SECRET ) ; 
         if(!decoded){
            return res.status(403).json({message : "token does not match"})
         }else{
            req.userId = decoded.id ; 
         } 
         next() ; 
    } catch (error) {
          res.status(500).json({message : "something went wrong in authsection " ,error :error.message})        
    }

}