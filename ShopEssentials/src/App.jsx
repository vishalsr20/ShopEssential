import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./pages/Navbar"
import Hero from "./pages/Hero"
import { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Feedback from "./pages/Feedback"
import AdminLogin from "./pages/AdminLogin"
import Admin from "./components/Admin"
import AddtoCart from "./components/AddtoCart"
import CreateProduct from "./pages/CreateProduct"
import OrderSuccessfully from "./pages/OrderSuccessfully"
import OrderPlaced from "./components/OrderPlaced"

function App() {

  const [isLoggedIn , setIsloggedIn] = useState(false)
  const[cartCount , setcartCount] = useState(0)
  const[cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("shop-essential");
    
    if (userData) {
      
      setIsloggedIn(true);
    }
  }, []);

  useEffect( () =>{
    console.log("Logged In",isLoggedIn)
  },[isLoggedIn])
  const handleAddToCart = (product) =>{
   let value = cartCount + 1;
    setcartCount(value);
    setCartItems((prevItems) => [...prevItems, product]); 
  }


  
  return (
    <>
  
      <div>

      <BrowserRouter>
       <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} cartCount={cartCount} />
  
       <Routes>
  
        <Route  path="/login" element={ isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsloggedIn={setIsloggedIn} />  } />
        <Route path="/signup" element={ <Signup isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} /> }/>
        <Route path="/" element={<Hero  isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard setIsloggedIn={setIsloggedIn} isLoggedIn={isLoggedIn} cartCount={cartCount} onAddToCart={handleAddToCart} /> : <Navigate to="/login" />} /> 
        <Route path="/contact" element={isLoggedIn ? <Contact setIsloggedIn={setIsloggedIn} isLoggedIn={isLoggedIn} />: <Navigate to="/login"/>} />
        <Route  path="/about" element={<About/>}/> 
        <Route path="/feedback" element={<Feedback/> } />
        <Route path="adminlogin" element={<AdminLogin/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/addtocart" element={<AddtoCart cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} setcartCount={setcartCount} setIsloggedIn={setIsloggedIn} isLoggedIn={isLoggedIn}/> } />
        <Route path="/createproduct"  element={<CreateProduct/>} />
        <Route path="/ordersuccessfully" element={<OrderSuccessfully/>} />
        <Route path="/orderplaced" element={<OrderPlaced/>}/>
       </Routes>
       </BrowserRouter>
      </div>
    
   
    </>
  )
}

export default App
