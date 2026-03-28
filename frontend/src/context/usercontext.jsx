import { useState } from "react";
import { createContext } from "react";

export const Usercontext = createContext() ; 

export const Wrappercontext = ({children})=>{  

        const [user , setuser] = useState() ; 

        const value = {user  , setuser}
    return( 
        <Usercontext.Provider  value={value}>{children}</Usercontext.Provider>
    )

} 