function Signup(){ 

    async function handlebtnforloginwithgithub(){
         window.location.href = "http://localhost:9000/api/auth/github"
         }
          
    
    return(
           <div className=" h-fit mt-40 w-full flex justify-center items-center"> 
            <div className="border-2 h-90 w-70  flex flex-col px-3 gap-2">  
               <label htmlFor="name">username</label>
                <input type="text" id="name" placeholder="enter your username" className="border h-6 px-3   py-3"/> 

                 <label htmlFor="name">password</label>
                <input type="text" id="name" placeholder="enter your password" className="border h-6 px-3   py-3"/>

                 <label htmlFor="name">gmail</label>
                <input type="text" id="name" placeholder="enter your gmail" className="border h-6 px-3   py-3"/> 

                <button className="border-2 mt-4  py-1.5 bg-black text-white">submit</button> 
                <button className="border-2  py-1.5 bg-black text-white" onClick={handlebtnforloginwithgithub}>continue with github</button>
                  
                  <h3>Already have an account ? Signin</h3>

            </div>
           </div>
    )
} 
export default Signup