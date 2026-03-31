import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter hover:text-blue-600 transition-colors">
                    SHOP<span className="text-blue-600">CART</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link 
                        to="/cart" 
                        className="relative group flex items-center gap-2 py-2 px-4 rounded-xl bg-gray-900 text-white hover:bg-blue-600 transition-all active:scale-95 shadow-md shadow-gray-200"
                    >
                        <span className="font-bold text-sm">Cart</span>
                        
                        {cartCount > 0 && (
                            <span className="flex items-center justify-center bg-blue-500 text-white text-[10px] font-black w-5 h-5 rounded-full border-2 border-gray-900 group-hover:border-blue-600 transition-colors">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;