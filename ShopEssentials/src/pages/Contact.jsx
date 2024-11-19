import  { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FeedBackRoutes } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
const Contact = ({setIsloggedIn,isLoggedIn}) => {

    const navigate = useNavigate();
    console.log("Conatct login",isLoggedIn)
    const [location, setLocation] = useState("")
    const[values,setValues] = useState({
        name:"",email:"",message:"",subject:""
    })
 
 
    function ChangeHandlerMap(e){
        setLocation(
            e.target.value
        )
    }
    function ChangeHandler(e){
        
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })

    }
    const  SubmitHandler =async  (e) => {
        e.preventDefault();
        console.log("Feedback Values",values)
       
        const {name,email,subject,message} = values
        if(handleValidation()){
            console.log("Checking for the validation")
            try{
               
                const {data} =await axios.post(FeedBackRoutes,{
                    name,
                    email,
                    subject,
                    message,
                    
                }
               
                )
                console.log("checking for the login", setIsloggedIn)
                if(isLoggedIn  === false){
                    navigate('/login')
                }
                console.log("Checking for the data",data)
                if( data.status === false){
                    toast.error("Feedback not sent")
                    
                    console.log("Checking for the data")
                    navigate('/login')
                }else{
                    toast.success("Feedback sent successfully ")
                    navigate("/feedback")
                  
                }
            }catch(error){
                console.log("Feedback error",error.message)
               return false
            }
            
        }
    }

    function handleValidation (){
        const {name,email,subject,message} = values
        try{
            if (!name || !email || !subject || !message) {
                toast.error("All fields are required.");
                return false;
            }

            return true
        }catch(error){
            console.log(error)
            return false 
        }
    }

    function SubmitHandlerMap(e){
        e.preventDefault();

        

    }
    return (
     
        isLoggedIn ? (
            <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

            {/* Contact Form */}
            <form 
            onSubmit={(e) => SubmitHandler(e)}
            className="flex flex-col gap-4 mb-10 bg-white p-6 rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Enter Yout Name"
                    name="name"
                    required
                    onChange={(e) => ChangeHandler(e) }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={(e) => ChangeHandler(e) }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    name='subject'
                    onChange={(e) => ChangeHandler(e) }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Message"
                    required
                    name="message"
                    onChange={(e) => ChangeHandler(e) }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                ></textarea>
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"

                >
                    Submit
                </button>
            </form>

            {/* Contact Information */}
            <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg">

                <p className="mb-2"><strong>Email:</strong> vishalrathod19918@gmail.com</p>
                <p className="mb-2"><strong>Address:</strong> Maharashtra(Mumbai) , India</p>
                <p><strong>Hours:</strong> Indian Time</p>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6 mb-10">
                <a
                    href="https://www.linkedin.com/in/vishal-rathod-b739182a6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                    LinkedIn
                </a>
                <a
                    href="https://x.com/VishalSR191918"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition duration-300"
                >
                    Twitter
                </a>
                <a
                    href="https://github.com/Rathod-vishal-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 transition duration-300"
                >
                    Git hub
                </a>
            </div>

            {/* Embedded Google Map */}
            <div className="mb-6">
                <form onSubmit={SubmitHandlerMap} className="flex items-center gap-2">
                    <input
                        type="text"
                        name="location"
                        placeholder="Search Location"
                        value={location}
                        onChange={(e) => ChangeHandlerMap(e)}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Go
                    </button>
                </form>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?...your-location..."
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    title="Location Map"
                    className="w-full h-96"
                ></iframe>
            </div>
            <ToastContainer/>
        </div>
        ) : (<div> Go to login page
            <Link to="login">Login</Link>
        </div>)
    );
};

export default Contact;
