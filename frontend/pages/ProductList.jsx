import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList() {
  const [products, setProducts] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)   
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {  
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [BASEURL]);

  //  UI Rendering
   if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">
            Loading products...
            </p>
        </div>
        </div>
    );
    }
   if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-6 shadow bg-white">
        Product List
        </h1>

        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
            products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))
        ) : (
            <p className="text-center col-span-full text-gray-500">
            No products found
            </p>
        )}
        </div>
    </div>
    );
}

export default ProductList;