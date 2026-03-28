import {Routes  , Route  } from 'react-router-dom'
import Navbar from "./pages/navbar";
import About from './pages/About';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Connect from './pages/connect';  
import Homepage from './pages/homepage';
function App(){
  return (
    <div> 
      <Navbar/>
       <Routes> 
        <Route path='/' element={<Homepage/>}></Route>
       <Route path='/about' element={<About/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route> 
                     <Route path='/signin' element={<Signin/>}></Route> 
                     <Route path='/connect' element={<Connect/>}></Route>
       </Routes>
    </div> 
  )
} 

export default App  ;