import mongoose from "mongoose"; 

const dbconnect = async()=>{ 
    try { 
           const url = process.env.MONGOOSE_URL ; 
          await mongoose.connect(url) ; 
          console.log("db connected ✅")
    } catch (error) {
        console.log(error.message) ; 
    }

} 

export default dbconnect ; 