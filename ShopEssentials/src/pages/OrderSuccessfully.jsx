
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderSuccessfully = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/dashboard');
    toast.info("Redirected to Home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-md rounded-lg p-10 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase. Your order has been placed successfully!
        </p>
        <button
          onClick={handleReturnHome}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessfully;
