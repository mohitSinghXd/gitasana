function About(){ 

    const handlebtn = ()=>{
          window.location.href = "http://localhost:9000/newlogin/auth/google"
    }
    return(
        <div> 
            <button className="border-2" onClick={()=>handlebtn()}>continue with google</button>
        </div>
    )
} 
export default About