import React, { useEffect, useState } from 'react'
import axios from "axios"
const ProductList = ({setIsloggedIn,cartCount,onAddToCart}) => {
    const[products, setProducts] = useState([])


    const onaddToCart = (product) => {
      // Add product to cart logic
      setCartItems((prevItems) => [...prevItems, product]);  // Update cart items
      setCartCount(cartCount + 1);  // Increase cart count
    };
    

   


  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
            products.map( product => (
                <div key={product.id}
                 className="border rounded-lg cursor-pointer bg-slate-400 hover:shadow-lg text-center"
                 style={{ width: '20rem', height: '28rem' }}>
                    <img src={product.image} alt={product.title} className="w-full h-48 object-contain"   />
                    <h2 className="text-red-400 mt-2 text-lg font-semibold">
                      {product.title.length > 30 
                      
                      ? `${product.title.substring(0,30)}...`
                      : product.title
                      }
                      
                      </h2>
                     <p className="text-gray-700 text-sm p-2 overflow-hidden h-24"  >
                     {product.description.length > 100 
                                ? `${product.description.substring(0, 100)}...` 
                                : product.description}
                      </p>
                    <p className="font-bold">Price: ${product.price}</p>
                    <div className='flex justify-around mt-2'>
                      <button className="py-2 px-6 bg-blue-700 rounded-lg hover:bg-blue-800 shadow-lg transition-all duration-200 ease-in-out"  >Shop Now</button>
                      <button className="  py-2 px-6 flex  bg-green-400 rounded-lg z-0 hover:bg-green-600 shadow-lg transition-all duration-200 ease-in-out"
                      onClick={() => onaddToCart(product)} >Add to Cart</button>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ProductList
