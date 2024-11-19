import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const navigate = useNavigate()
    function submitHandler(e){
        e.preventDefault();
        navigate('/contact')
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 rounded-lg shadow-md text-center">
      <FaCheckCircle className="text-green-500 text-5xl mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Feedback Sent Successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for sharing your thoughts with us. We appreciate your input.</p>
      <button
        className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm transition-colors"
        onClick={(e) => submitHandler(e)}
      >
        Send More Feedback
      </button>
    </div>
  );
};

export default Feedback;
