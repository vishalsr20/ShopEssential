import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import money from "../assets/money.png";
import Shoes from "../assets/airjorden.webp";

const AddtoCart = ({ cartItems, setCartItems, cartCount, setcartCount, setIsloggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  // const userData = localStorage.getItem("shop-essential")
  // console.log("User data",userData)
  useEffect(() => {
    const price = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(price);
    setcartCount(cartItems.length);
  }, [cartItems, setcartCount]);

  function submitHandler() {
    // toast.success("Please provide this details");
   
    navigate("/orderplaced");
  }

  if (isLoggedIn === false) {
    navigate('/login');
    return;
  }

  const removeHandler = (itemToRemove) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item._id !== itemToRemove._id)
    );
    
    toast.info(`${itemToRemove.name} has been removed from your cart.`);
  };

  return (
    <div className="p-4 md:p-8 mt-10">
      <div className="text-2xl md:text-4xl font-bold flex items-center gap-2">
        <img src={money} alt="Money" width={50} />
        <span>Total Price: Rs <span>{totalPrice}</span></span>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.length === 0 ? (
          <div className="col-span-full text-center text-xl font-semibold">Your cart is empty.</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="bg-slate-400 rounded-lg p-4 flex flex-col items-center shadow-lg transition-transform duration-300 transform hover:scale-105">
              <img src={Shoes} alt={item.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-gray-700">{item.description}</p>
              <p className="mt-2 font-semibold text-lg">Rs {item.price}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="w-24 py-2 px-4 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200"
                  onClick={() => removeHandler(item)}
                >
                  Remove
                </button>
                <button
                  className="w-24 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200"
                  onClick={submitHandler}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddtoCart;
