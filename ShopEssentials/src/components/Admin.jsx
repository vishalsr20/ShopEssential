import { FetchProductsRoutes } from "../utils/APIRoutes";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteProductRoutes } from "../utils/APIRoutes";
import { toast, ToastContainer } from 'react-toastify';
const Admin = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(FetchProductsRoutes)
      .then((response) => {
        console.log("API Response", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching product", error);
      });
  }, []);

  const deleteHandler =async (productid) => {
    axios.delete(`${DeleteProductRoutes}/${productid}`)
    .then( () => {
      setProduct(products.filter( (product) => product.id !== productid))
      console.log("Product deleted successfully")
      toast.success("Product deleted successfully")
      
    })
    .catch( (error) => {
      console.log("Error while deleting product",error)
    })
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            {/* Product Name and Description */}
            <div className="p-4 text-center w-full">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                
                {
                  product.description.length > 100  ? ( `${product.description.slice(0,75)}...`) : ( product.description)
                }
               
                
                </p>

              {/* Price and Discount */}
              <div className="mt-4 flex flex-col items-center">
                <p className="text-lg font-bold text-gray-900">
                  Rs {product.price}{" "}
                  <span className="text-sm text-gray-500 line-through">
                  
                  </span>
                </p>
                <p className="text-green-600 text-sm mt-1 line-through   text-bold ">Rs {product.discount}</p>
              </div>

              {/* Delete Button */}
              <div className="flex justify-center mt-4">
                <button
                onClick={ () => deleteHandler(product._id)}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Admin;
