import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Connect(){  


  
 const navigate = useNavigate()  ; 
    const [user , setuser] = useState(false) 

      useEffect(()=>{
        if(!user){
            navigate("/signup") ; 
        }
    }, [])
    return(
        <div>
           <h1>connect</h1>
        </div>
    )
} 
export default Connect