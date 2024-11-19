import { useState } from "react";
import axios from "axios";
import { CreateOrderRoutes } from "../utils/APIRoutes.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    image: null
  });

  function ChangeHandler(e) {
    const { name, value, files } = e.target;

    if (name === 'image' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          [name]: reader.result.split(",")[1]
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    toast.success("Product creating please wait")
    const productData = {
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      image: product.image
    };

    try {
      const { data } = await axios.post(CreateOrderRoutes, productData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (data.status === false) {
        toast.error("Product is not created");
      }
      if (data.status === true) {
       
        toast.loading("Creating please wait ..")
        navigate('/dashboard')
      }
    } catch (error) {
      console.log("Error in submission", error);
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
        onSubmit={(e) => submitHandler(e)}
      >
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Create Product</h2>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            onChange={(e) => ChangeHandler(e)}
            placeholder="Name of the product"
            required
            className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            onChange={(e) => ChangeHandler(e)}
            placeholder="Enter a description"
            required
            className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="discount"
            onChange={(e) => ChangeHandler(e)}
            placeholder="Enter the original  price"
            required
            className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="price"
            onChange={(e) => ChangeHandler(e)}
            placeholder="Enter the Discount price"
            required
            className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            onChange={(e) => ChangeHandler(e)}
            required
            className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Create Product
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateProduct;
