
import mongoose  from "mongoose"; 

const  userSchema = mongoose.Schema({ 
    githubId: { 
        type :String , 
         required : true ,
         unique : true , 
         trim : true  ,

    } , 
     username  : {
        type : String , 
        required  : true ,  
        trim    : true , 
     } ,  
     email  : {
        type : String , 
        unique : true ,  
        trim  : true 
     }  ,
     avatar : {
        type  : String , 
     } , 
     githubToken : {
        type : String , 
        required : true ,
        trim: true 
     }   
,  
asanatoken:{
       type : String , 
       
        trim: true 
}

} , {
    timestamps  : true , 
})  



const User = mongoose.model("users" , userSchema) ; 
export default User ; 