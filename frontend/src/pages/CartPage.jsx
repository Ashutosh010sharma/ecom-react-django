import { useCart } from "../context/CartContext";

function Cartpage() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">
                    Your <span className="text-blue-600">Bag</span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-xl font-medium">Your cart is feeling a bit light...</p>
                        <a href="/" className="inline-block mt-6 text-blue-600 font-bold hover:underline">Go Shopping →</a>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Cart Items List */}
                        <div className="lg:w-2/3 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
                                    {/* Small Image Placeholder (if available) */}
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                                        <p className="text-blue-600 font-black">₹{item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                        <button 
                                            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded-lg transition-all"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        >
                                            −
                                        </button>
                                        <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                        <button 
                                            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded-lg transition-all"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button 
                                        className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-28">
                                <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Order Summary</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-bold">Free</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-900 font-bold">Total Amount</span>
                                        <span className="text-3xl font-black text-gray-900">₹{total}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-8 bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200">
                                    Checkout Now
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Cartpage;