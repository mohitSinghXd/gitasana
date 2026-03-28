import App from './App'
import { createRoot } from 'react-dom/client' 
import { BrowserRouter } from 'react-router-dom'
import './index.css' 
import { Wrappercontext } from './context/usercontext'
createRoot(document.getElementById('root')).render(
<BrowserRouter>  
<Wrappercontext>
  <App  />
  
</Wrappercontext>
</BrowserRouter> 
  
  
)
