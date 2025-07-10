import { FetchProductsRoutes, DeleteProductRoutes } from "../utils/APIRoutes";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    if (isLoading || page > totalPages) return;

    setIsLoading(true);
    try {
      const res = await axios.get(`${FetchProductsRoutes}?page=${page}&limit=10`);
      const newProducts = res.data.products || res.data;
      setProducts((prev) => [...prev, ...newProducts]);
      setTotalPages(res.data.totalPages || 1);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [page, totalPages, isLoading]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !isLoading && page <= totalPages) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts, isLoading, page, totalPages]);

  // Delete product
  const deleteHandler = async (productId) => {
    try {
      await axios.delete(`${DeleteProductRoutes}/${productId}`);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4 text-center w-full">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {product.description.length > 100
                  ? `${product.description.slice(0, 75)}...`
                  : product.description}
              </p>
              <div className="mt-4 flex flex-col items-center">
                <p className="text-lg font-bold text-gray-900">Rs {product.price}</p>
                <p className="text-green-600 text-sm mt-1 line-through font-semibold">
                  Rs {product.discount}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-green-600 text-lg mt-6">Loading more products...</p>
      )}

      {page > totalPages && (
        <p className="text-center text-gray-500 text-sm mt-4">All products loaded.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Admin;
