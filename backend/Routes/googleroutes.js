import express from "express" ; 
const googleroutes = express.Router() ; 

googleroutes.get("/auth/google" , (req ,res)=>{
    res.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.google_client_id}&response_type=code&redirect_uri=http://localhost:9000/newlogin/auth/google/callback&scope=profile email`) ; 

})

googleroutes.get("/auth/google/callback" , async(req , res)=>{
    const code = req.query.code  ;  

    try {
         const response1 = await fetch("https://oauth2.googleapis.com/token" , {
            method: "POST" , 
            body : JSON.stringify({
                code : code  , 
                client_id :  process.env.google_client_id, 
                client_secret : process.env.google_client_secret , 
                redirect_uri : "http://localhost:9000/newlogin/auth/google/callback" , 
                grant_type :"authorization_code" 
            })
         })  

         const actual_data = await response1.json() ;
         const access_token = actual_data.access_token ; 
         
         
         const response2 = await fetch("https://www.googleapis.com/oauth2/v3/userinfo" , {
            method : "GET" , 
            headers : {
                "Authorization" : `Bearer ${access_token}`
            }
         }) 

         const userinfo = await response2.json() ; 
         console.log(userinfo)  ;  
         res.redirect("http://localhost:5173")
    } catch (error) { 
        console.log(error)
        
    }

}) 

export default googleroutes  ; 