import { Route, Routes as RoutesReact } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail"; 
import { Register } from "../pages/auth/Register";
import Home from "../pages/Home";
import { Login } from "../pages/auth/Login";
//import { Create } from "../pages/Create";
import ProductList from "../pages/ProductList"
import ShoppingCart from "../pages/ShoppingCart";

const Routing = () => {
  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<ProductList />} />
      <Route path="/productos/:id" element={<ProductDetail />} /> {/* Ruta para el detalle */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/*<Route path="/create" element={<Create />} />*/}
      <Route path="/cart" element={<ShoppingCart />} />
    </RoutesReact>
  );
};

export default Routing;