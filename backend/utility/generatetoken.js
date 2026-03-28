 import jwt from "jsonwebtoken" 
  export const generateToken = ({_id})=>{  
        const token = jwt.sign({id : _id} ,process.env.ACCESS_SECRET , {expiresIn: "5d"})   ; 
         return token  ;

 } 
  export const genereateRefreshToken = ({_id})=>{   
    const token = jwt.sign({id : _id} ,process.env.REFRESH_SECRET , {expiresIn: "8d"})   ; 
         return token  ;
 } 

 