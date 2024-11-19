import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer ,toast} from "react-toastify";
import { OrderProductRoute } from "../utils/APIRoutes";


const OrderPlaced = () => {
    const navigate = useNavigate();
    const [value , setValues] = useState({
        email:"",name:"",address:"",pincode:"",number:""
    })
    
    const ChangeHandler = (e) => {
        setValues({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    const SubmitHandler =async (e) => {
        e.preventDefault();

        const { email,name, address,pincode,number } = value;
        
        const {data} = await axios.post(OrderProductRoute,{
            email,name, address,pincode,number
        })
        if(data.status === false){
            toast.error("All filed are required")
        }else{
            navigate("/ordersuccessfully")
            
        }
       
    }
  return (
    <div className="flex justify-center items-center mt-14 w-full h-full">
      <form onSubmit={ (e) => SubmitHandler(e)}>
        <div className="flex flex-col justify-center   items-center w-[480px] border bg-slate-600 mt-40 rounded-xl shadow-lg">
            <br />
            <input type="email" 
             className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            onChange={(e) => ChangeHandler(e)}
            name="email"
            
            />
            <br />
            <input type="text"
             className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name" 
            placeholder="Enter your  full name"
            onChange={(e) => ChangeHandler(e)}
            />
            <br />
            <input type="text"
             className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="address" 
            placeholder="Enter your  address"
            onChange={(e) => ChangeHandler(e)}
            />
            <br />
            <input type="text" 
             className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="pincode"
            placeholder="Enter your pincode"
            onChange={(e) => ChangeHandler(e)}
            />

            <br />
    
        
    <input type="number" 
    
             className="px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="number"
            placeholder="Enter you Contact Number"
            onChange={(e) => ChangeHandler(e)}
            />
    
            <br />
            <button
                type="submit"
            >
            Placed Order</button>
        </div>
      </form> 
      <ToastContainer/>
    </div>
  )
}

export default OrderPlaced
