import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the product");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        {error}
      </p>
    );

  if (!product)
    return (
      <p className="text-center text-gray-500 mt-10">
        No product found
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-96 object-contain"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-semibold text-green-600 mb-4">
                ₹{product.price}
              </p>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg font-medium transition duration-300 shadow-md">
              🛒 Add to Cart
            </button>
            <div className="mt-4">
              <a href="/" className="text-blue-600 hover:underline">
               &larr; Back to Home
              </a>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;