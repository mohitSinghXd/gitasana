import { NavLink } from "react-router-dom"; 
import { GiHamburgerMenu } from "react-icons/gi"; 
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Usercontext } from "../context/usercontext";
import { useContext } from "react";

function Navbar() { 
    const [openburger, setopenburger] = useState(false);   
    const[profile , setprofile] = useState(false)
    const {user  , setuser} = useContext(Usercontext); 
    

    return ( 
        <nav className="h-16 w-full relative border-2 flex items-center justify-between px-5">

            {/* Logo */}
            <div className="text-lg font-bold"><span className="text-red-600">git</span>Asana</div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 text-[17px] list-none">
                <li><NavLink className={({isActive})=>isActive? "underline text-blue-900" : ""} to="/">Home</NavLink></li>
                <li><NavLink className={({isActive})=>isActive? "underline text-blue-900" : ""} to="/about">About</NavLink></li>
                <li><NavLink className={({isActive})=>isActive? "underline text-blue-900" : ""} to="/contact">Contact</NavLink></li>
                <li><NavLink className={({isActive})=>isActive? "underline text-blue-900" : ""} to="/some">Content</NavLink></li>
            </ul> 
          
<div className="flex gap-7">
            {/* Hamburger (Mobile) */}
            <GiHamburgerMenu 
                className="md:hidden h-7 w-8 cursor-pointer" 
                onClick={() => setopenburger(prev => !prev)} 
            />   

            {user && <div className="border-2 h-8 w-8 md:h-9 md:w-9 rounded-[50%]" onClick={()=>setprofile(!profile)}>
                <img src={user.avatar} className="object-cover h-fit w-fit rounded-[50%]" alt="profile"/></div>}
 </div> 
            {/* Mobile Menu */}
            {openburger && (
                <div className="absolute top-16 left-0 w-full bg-white border-2 md:hidden">
                    <ul className="flex flex-col gap-4 p-4 text-[17px]">
                        <li onClick={() => setopenburger(false)}>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li onClick={() => setopenburger(false)}>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li onClick={() => setopenburger(false)}>
                            <NavLink to="/connect">connect</NavLink>
                        </li>
                        <li onClick={() => setopenburger(false)}>
                            <NavLink to="/some">Content</NavLink>
                        </li>
                    </ul>
                </div>
            )}
              
     {profile && <div className="shadow-md shadow-gray-950 rounded-[12px] h-35  w-48 absolute  transition-all ease-in-out duration-300 top-16 right-2 flex flex-col gap-3 px-1.5">  
        <div className="shadow-sm rounded-[10px] mt-3 shadow-blue-300 h-7 w-full text-center">{user.username}</div> 
                <div className="shadow-sm px-1 rounded-2xl shadow-blue-300 h-7 w-full text-center text-[11px]">{user.email}</div>
              <button className="bg-black text-white rounded-[10px] w-20 ml-13">logout</button>
        </div>}
        </nav>
    )
}

export default Navbar;