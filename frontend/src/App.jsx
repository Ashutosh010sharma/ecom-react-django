import ProductList from "./pages/ProductList";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Cartpage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path ="/product/:id" element={<ProductDetails/>}></Route>
        <Route path ="/cart" element={<Cartpage/>}></Route>
        <Route path ="/checkout" element={<CheckoutPage/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;