import Footer from "./Footer"
import Slider from "./Slider"


const Hero = ({isLoggedIn,setIsloggedIn}) => {
  return (
    <div className="">
      <div className="">
      <Slider isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>
      
      <Footer/> 
      </div>
    </div>
  )
}

export default Hero
