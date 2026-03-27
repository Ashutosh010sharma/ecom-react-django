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
  <div className="min-h-screen bg-gray-50/50">
    {/* Sticky Header with Glassmorphism */}
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Featured <span className="text-blue-600">Products</span>
        </h1>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 pb-20">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Enhanced Empty State */
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
             <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No products found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </main>
  </div>
);
}

export default ProductList;