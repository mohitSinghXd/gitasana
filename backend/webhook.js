 
 import express from "express"; 

 const webhookroutes  = express.Router(); 
  webhookroutes.post("/github" , async(req ,res)=>{
    const event = req.headers['x-github-event']
    const payload = req.body ;   
    const branch = payload.ref.replace('refs/heads/', '')
    const pusher = payload.pusher.name
    const commitMsg = payload.head_commit.message
    const filesModified = payload.head_commit.modified
    const filesAdded = payload.head_commit.added 
 
    const taskdata  = {
        data :{
            name :`push by ${pusher}` ,
            notes : `commit  : ${commitMsg}` , 
            projects : [process.env.ASANA_PROJECT_ID]
        }
    }
    try { 
        const response = await fetch("https://app.asana.com/api/1.0/tasks", {
            method:"POST" , 
            headers: {
                "Authorization"  : `Bearer ${process.env.ASANA_PAT}`  ,
                "Content-Type" : "application/json"
            }   ,
                 body : JSON.stringify(taskdata)
        } ,   

    ) 

   
const data = await response.json()
console.log(data)
        
    } catch (error) {
         console.log(error)
    }

    

     res.status(200).send('OK') 
}) 
 
export default webhookroutes ; 