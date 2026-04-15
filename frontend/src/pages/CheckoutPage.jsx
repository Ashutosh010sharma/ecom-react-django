import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Order placed Successfully! 🎉");
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 lg:p-12 border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Checkout</h1>
          <p className="text-gray-500 font-medium">Complete your details to finalize the order</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
            />
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Delivery Address</label>
            <textarea
              name="address"
              placeholder="House No, Street, City, Pincode"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Payment Method</label>
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium appearance-none"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Credit Card">Online Payment</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-lg font-bold transition-all active:scale-95 shadow-xl ${
                loading 
                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                : "bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200"
              }`}
            >
              {loading ? "Processing..." : "Confirm & Place Order"}
            </button>
          </div>

          {/* Status Messages */}
          {message && (
            <div className={`mt-4 p-4 rounded-xl text-center font-bold text-sm ${
                message.includes("Successfully") 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;