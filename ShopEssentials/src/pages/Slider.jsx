import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../assets/slide-1.png";
import slide2 from "../assets/slide-2.png";
import slide3 from "../assets/slide-3.png";
import { Carousel } from "react-responsive-carousel";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "../components/Dashboard";


const Slider = ({ isLoggedIn, setIsloggedIn }) => {
  const navigate = useNavigate();

  function changeHandler() {
    if (!isLoggedIn) {
      toast.error("Login Required");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }

  return (
  <div>
      <div className="relative mx-auto mt-16 max-w-6xl px-2">
      <Carousel
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        stopOnHover={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        transitionTime={600}
        swipeable={true}
        useKeyboardArrows={true}
        className="rounded-lg overflow-visible"
      >
        {[slide2, slide3, slide1].map((slide, index) => (
          <div
            key={index}
            className="relative h-[400px] sm:h-[360px] md:h-[380px] lg:h-[420px] xl:h-[440px] overflow-hidden rounded-xl shadow-xl"
            style={{
              transform: "scale(0.95)",
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              loading={lazy}
              className="w-full h-full object-cover rounded-xl"
              style={{
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              }}
            />
          <button
          onClick={changeHandler}
          className="absolute h-16 w-52 bottom-6 left-6 bg-black/80 text-white font-semibold px-6 py-2 rounded-md hover:bg-black transition"
        >
          Shop Now
        </button>

          </div>
        ))}
      </Carousel>
      <ToastContainer />
    </div>
  
  </div>
  );
};

export default Slider;
