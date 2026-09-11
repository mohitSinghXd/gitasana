import express from "express" ;   
import cors  from 'cors'
import dotenv from "dotenv" ;  
import dbconnect from "./config/dbconnect.js"
import authRoutes from "./Routes/authroutes.js"; 
import cookieParser from "cookie-parser"; 
import webhookroutes from "./webhook.js";
import googleroutes from "./Routes/googleroutes.js";
dotenv.config({quiet : true}) ;  
const app = express() ;  
app.use(express.json())  ; 
app.use(cors({
    origin :"http://localhost:5173" , 
    methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"], 
    credentials : true  
}))  
app.use(cookieParser()) ; 

app.use("/api"  , authRoutes )  ;   
app.use("/newlogin" , googleroutes)
app.use("/webhooks"   ,webhookroutes )
app.get("/" , (req, res)=>{
    res.send("hello from the server") ;
})   



const port =  process.env.PORT || 3000 ; 
app.listen(port , ()=>{ 
dbconnect()
    console.log("server is running ✅ on " , port) ;  

}) ; 
