import { useState, useEffect, useCallback } from "react";
import cart from "../assets/cart-148964_1920.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FetchProductsRoutes } from "../utils/APIRoutes";
import { toast } from "react-toastify";

const Card = ({ setIsloggedIn, cartCount, onAddToCart, isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${FetchProductsRoutes}?page=${page}&limit=10`);
      const newProducts = response.data.products || response.data;

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error while fetching products", error);
      toast.error("Error loading products.");
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // Load first page
  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !isLoading && hasMore) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts, isLoading, hasMore]);

  const ShopHandler = () => {
    if (!setIsloggedIn) {
      navigate("/signup");
    } else {
      toast.success("First add to cart");
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center bg-white border rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">
                {product.description.length > 70
                  ? `${product.description.slice(0, 70)}...`
                  : product.description}
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-500 line-through">Rs {product.discount}</p>
                <p className="text-green-600 font-bold">Rs {product.price}</p>
              </div>
              <div className="flex justify-evenly mt-4 gap-4">
                <button
                  onClick={ShopHandler}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="relative w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <img className="absolute left-3 top-2" src={cart} alt="Cart" width={20} />
                  Add to Cart
                  <span className="absolute top-0 right-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-green-600 text-lg mt-4">Loading more products...</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500 text-sm mt-4">No more products to load.</p>
      )}
    </div>
  );
};

export default Card;
