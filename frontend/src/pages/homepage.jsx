
import { useContext } from "react";

import { useEffect } from "react"
import { Usercontext } from "../context/usercontext"; 
import { FaPlus } from "react-icons/fa"; 
function Homepage(){  
const {user  , setuser} = useContext(Usercontext); 

async function handleasana(){
    const response = await fetch("http://localhost:9000/api/auth/asana/connect", {
        method: "GET",
        credentials: "include"
    })
    const data = await response.json()
    console.log(data) // "Asana connected!" dikhega
}

    useEffect(()=>{
         async function fetchuser(){ 
        const response = await fetch("http://localhost:9000/api/auth/getuser"  , {method :  "GET" ,credentials: "include"} ) ; 
         const actualresponse = await response.json() ;   
         const userinfo = actualresponse.user  ;
        setuser(userinfo) ;  
        console.log(userinfo);
        } 
        fetchuser() ; 
    } , [])
    return(  
        <div className="flex flex-row gap-4  justify-center "> 

         <div className="flex flex-col">
            {user && <div className="border-2  h-25 md:h-30 w-25 md:w-30 top-70 left-5 md:left-130 absolute  rounded-[50%]">  
            
            <img src={user.avatar} alt="profilePic"  className="object-cover h-fit w-fit  rounded-[50%]"/>
         </div> }
         <h1 className="absolute top-102 left-11 text-[18px] font-semibold">Github</h1>
         </div>
         <div >
            <div className="border-2  h-25 md:h-30 w-25 md:w-30   absolute top-70  right-6 md:right-130
     rounded-[50%]">
        <FaPlus onClick={()=>handleasana()} className="h-10 w-10 absolute top-7 left-7 " />
     </div>
            <h1 className="absolute top-102 right-11 text-[18px] font-semibold">Asana</h1>
         </div>

        </div>
    )
} 
export default Homepage