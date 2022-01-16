
import React  from 'react';
// import { Home, Router } from '@material-ui/icons';
import './App.css';
import { BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import Product from './compoments/Product';
import Login from './compoments/Login';
// import {handleLogin} from './compoments/Login'
import Home from './compoments/Home'
import Register from './compoments/Register';
import Logout from './compoments/Logout';
function App() {
  return (
    <Router >   
      <Routes>
      <Route path = "/" element={<Home/>} exact/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/logout" element={<Logout/>}/>
      <Route path = "/register" element={<Register/>}/>
     
      <Route path = "/product" render={(props)=>{ 
        if(!localStorage.getItem('token')){
          return <Navigate to="/login"></Navigate>
        }
        return <Navigate to="/product"></Navigate>
      }} 
      element={<Product/>}/>
      </Routes>
       

    </Router>
  );
}


export default App;
   

