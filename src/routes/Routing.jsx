import { Route, Routes as RoutesReact } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail"; 
import { Register } from "../pages/auth/Register";
import Home from "../pages/Home";
import { Login } from "../pages/auth/Login"
import ProductList from "../pages/ProductList"
import ShoppingCart from "../pages/ShoppingCart";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<ProductList />} />
      <Route path="/productos/:id" element={<ProductDetail />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="*" element={<NotFound />} />
    </RoutesReact>
  );
};

export default Routing;