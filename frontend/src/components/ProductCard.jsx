import { Link } from "react-router-dom";
function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
        
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={`${BASEURL}${product.image}`}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h2>

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900">
                ₹{product.price}
              </span>
            </div>

            <button 
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;