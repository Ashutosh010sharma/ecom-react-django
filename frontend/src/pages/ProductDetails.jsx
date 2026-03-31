import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useCart} from "../context/CartContext"; 

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {addToCart} = useCart();

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
  <div className="h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">
    <div className="max-w-6xl w-full h-full max-h-[700px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
      
      {/* Left Side: Image - Flexible but contained */}
      <div className="md:w-1/2 h-1/2 md:h-auto bg-gray-50 flex flex-col relative p-8">
        <Link 
          to="/" 
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 transition-colors font-bold flex items-center gap-2 z-10"
        >
          ← <span className="text-xs uppercase tracking-widest">Back</span>
        </Link>
        
        <div className="flex-1 flex items-center justify-center overflow-hidden mt-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Right Side: Details - Scrollable only if text is too long */}
      <div className="md:w-1/2 flex flex-col p-8 lg:p-12 justify-between">
        
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <p className="text-3xl font-black text-gray-900">
              ₹{product.price}
            </p>
            {/* <span className="text-gray-400 line-through text-sm">
              ₹{Math.round(product.price * 1.2)}
            </span> */}
          </div>

          <div className="h-px bg-gray-100 w-full mb-6" />

          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
            Description
          </h3>
          <p className="text-gray-500 leading-relaxed text-sm lg:text-base italic">
            {product.description}
          </p>
        </div>

        {/* Fixed Bottom Action */}
        <div className="mt-8 pt-6 border-t border-gray-50">
          <button onClick={()=> addToCart(product)} className="w-full bg-gray-900 hover:bg-blue-600 text-white py-4 rounded-2xl text-lg font-bold transition-all active:scale-95 shadow-xl shadow-gray-200">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  </div>
);
}

export default ProductDetails;