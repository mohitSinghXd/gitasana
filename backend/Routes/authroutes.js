import express from 'express' ; 
import User from '../Model/user.model.js';
import { generateToken } from '../utility/generatetoken.js';
import { isauth } from '../utility/isauth.js';
import { getuser } from '../utility/getcurrentuser.js';
const authRoutes  = express.Router() ; 

authRoutes.get( "/auth/github" , (req , res)=>{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.github_clientID}&scope=repo`)
}) ;  

authRoutes.get("/auth/github/callback" ,async(req ,res)=>{ 
    const code = req.query.code ;   
    try { 
          const response = await fetch("https://github.com/login/oauth/access_token"  ,  {
            method: "POST"  , 
            headers : {
                "Content-Type" : "application/json" ,
                "Accept"  : "application/json"
            } , 
            body : JSON.stringify({
                client_id : process.env.github_clientID  , 
                client_secret : process.env.github_clientsecret , 
                code : code
            })
          }) ; 
          const actualresponse = await response.json() ;  
           const token = actualresponse.access_token ;   

            const response2 = await fetch("https://api.github.com/user" , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })  ; 
            const userinfo = await response2.json() ; 
            const {login , avatar_url , id  , email } = userinfo ; 
            let user = await User.findOne({githubId : id}) ; 
            if(!user){
                user = await User.create({
                    username : login  ,  
                    avatar  : avatar_url , 
                    githubId : id  , 
                    email : email  , 
                    githubToken : token
                })
            } else {
                user.githubToken = token ; 
                await user.save() ;
            }
            const jwttoken = generateToken(user._id)  ;  
            res.cookie("token" , jwttoken ,{ 
                httpOnly : true , 
                secure : false ,
                sameSite : "lax"
            })
            res.redirect("http://localhost:5173")
    } catch (error) { 
        console.log(error) ;   
    }
})    

authRoutes.get("/auth/getuser" , isauth , getuser) ; 

authRoutes.get("/auth/asana/connect" , isauth , async(req , res)=>{
    try {
        const userId = req.userId
        const asanaPAT = process.env.ASANA_PAT

        const user = await User.findById(userId)
        user.asanaToken = asanaPAT
        await user.save()

        res.json({ success: true , message: "Asana connected!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
})


export default authRoutes ;