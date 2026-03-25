function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={`${BASEURL}${product.image}`}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600 font-bold text-lg">
            ₹{product.price}
          </p>

          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;