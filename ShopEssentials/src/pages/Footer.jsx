import logo from "../assets/Shopping-logo.webp";

function Footer() {
  return (
    <div className="bg-[#151218] text-white pt-8 pb-16" id="about">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Logo"
              className="h-[250px] w-[250px] mb-6 rounded-md"
            />
            <p className="text-center md:text-left max-w-xs">
              Shopping Essential is an AI-powered supply chain software that
              provides companies with tools for demand forecasting, inventory
              planning, and more. This helps them maintain the right amount of
              stock, optimize space, and fulfill every order effectively.
            </p>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col space-y-4 md:space-y-2">
            <h3 className="text-xl font-semibold">Explore</h3>
            <ul>
              <li>Pricing</li>
              <li>Product</li>
              <li>Customer Service</li>
              <li>Career</li>
            </ul>
          </div>

          {/* Learn Links */}
          <div className="flex flex-col space-y-4 md:space-y-2">
            <h3 className="text-xl font-semibold">Learn</h3>
            <ul>
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p>vishalrathod191918@gmail.com</p>
            <p className="py-4">
              Registered Office:
              <br />
              1507, Incubex, 11th cross road,
              <br />
              19th Main Road, Maharashtra, India. 560102
            </p>
            <p>
              Corporate Office:
              <br />
              291, All Time Space, 4th Floor,
              <br />
              15th A Cross, Sector - 6, HSR Layout,
              <br />
              Maharashtra, India. 560102
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="transition duration-300 py-3 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
            <a href="#vishal">Back to Top</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
