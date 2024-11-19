import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import slide1 from "../assets/slide-1.png";
import slide2 from "../assets/slide-2.png";
import slide3 from "../assets/slide-3.png";
import { Carousel } from "react-responsive-carousel";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { lazy } from "react";

const Slider = ({ isLoggedIn, setIsloggedIn }) => {
  const navigate = useNavigate();

  function changeHandler() {
    if (isLoggedIn === false) {
      toast.error("Login Required");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="relative">
      <Carousel
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
        stopOnHover={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        transitionTime={600}
        swipeable={true}
        useKeyboardArrows={true}
        className="rounded-lg overflow-hidden"
      >
        <div className="relative">
          <img src={slide2} alt="Shoe" loading={lazy} className="w-full h-auto object-cover" />
          <button
            onClick={changeHandler}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700"
          >
            Shop Now
          </button>
        </div>
        <div className="relative">
          <img src={slide3} loading={lazy}  className="w-full h-auto object-cover" />
          <button
            onClick={changeHandler}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700"
          >
            Shop Now
          </button>
        </div>
        <div className="relative">
          <img src={slide1} loading={lazy}  className="w-full h-auto object-cover" />
          <button
            onClick={changeHandler}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700"
          >
            Shop Now
          </button>
        </div>
      </Carousel>
      <ToastContainer />
    </div>
  );
};

export default Slider;
