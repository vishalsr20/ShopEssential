import { useState, useEffect } from "react";
import Shoe1 from "../assets/airjorden.webp";
import cart from "../assets/cart-148964_1920.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FetchProductsRoutes } from "../utils/APIRoutes";
import { toast } from "react-toastify";

const Card = ({ setIsloggedIn, cartCount, onAddToCart, isLoggedIn }) => {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    axios
      .get(FetchProductsRoutes)
      .then((response) => {
        // Checking for the api response
        // console.log("API Response", response.data);
        
        setProduct(response.data);
        setIsLoading(false)
        
      })
      .catch((error) => {
        console.log("Error while fetching product", error);
        setIsLoading(false)
      });
  }, [setIsLoading]);

  const navigate = useNavigate();
  function ShopHandler() {
    if (setIsloggedIn === false) {
      navigate("/signup");
    } else {
      console.log("props", setIsloggedIn);
      toast.success("First to the cart")
    }
  }

  return (

    <>
    
    <div className="">
      {
        isLoading ? (<div
        className="text-6xl  text-green-600 font-bold"
        >Loading Please Wait ...</div>) : 
        (      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6  gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white border rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Product Image */}
              <img
                src={product.image}
                
                alt="Shoes"
                className="w-full h-48 object-cover rounded-t-lg"
              />
  
              {/* Product Name and Description */}
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  
                  {
                  product.description.length > 50 ? (`${product.description.slice(0,70)}...`):(product.description)
                  
                  }
                  
                  </p>
  
                {/* Price and Discount */}
                <div className="mt-2">
                  <p className="text-lg font-bold text-gray-900">
                     {" "} 
                    <span className="text-sm text-gray-500 line-through">
                      Rs {product.discount}
                    </span><br />

                  </p>
                  <p className="text-green-600">Rs{product.price}</p>
                </div>
  
                {/* Buttons */}
                <div className="flex justify-evenly mt-4 gap-4">
                  {/* Shop Now Button */}
                  <button
                    onClick={ShopHandler}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Shop Now
                  </button>
  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="relative w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    <img className="absolute left-3 top-2" src={cart} alt="Cart" width={20} />
                    Add to Cart
                    <span className="absolute top-0 right-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                      {cartCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>)
      }

    </div>
 
    </>
  );
};   

export default Card;
