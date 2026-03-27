import ProductList from "./pages/ProductList";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path ="/product/:id" element={<ProductDetails/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;