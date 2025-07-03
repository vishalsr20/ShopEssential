import { useState } from "react";
import Card from "../pages/Card";

const Dashboard = ({ setIsloggedIn, cartCount, onAddToCart, isLoggedIn }) => {
  
  
  return (
    <div className="font-serif  flex flex-col items-center justify-center">

      {/* Animated welcome text */}
      {/* <div className="mt-20 text-4xl font-bold relative overflow-hidden ">
        <span className="animate-marquee inline-block text-purple-600">
          Welcome to Dashboard - Let's Get Started 🚀
        </span>
      </div> */}

      
  <div className=" mt-10">
        
         <Card
       
        setIsloggedIn={setIsloggedIn}
        cartCount={cartCount}
        onAddToCart={onAddToCart}
        isLoggedIn={isLoggedIn}
      />
    
      </div>
 
    </div>
  );
};

export default Dashboard;
