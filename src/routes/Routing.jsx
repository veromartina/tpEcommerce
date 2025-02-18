import { Route, Routes as RoutesReact } from "react-router-dom";
import ProductDetail from "../components/ProductDetail"; 
import { Register } from "../pages/auth/Register";
import Home from "../components/Home";
import { Login } from "../pages/auth/Login";
import { Create } from "../pages/Create";
import ProductList from "../components/ProductList";

const Routing = () => {
  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<ProductList />} />
      <Route path="/productos/:id" element={<ProductDetail />} /> {/* Ruta para el detalle */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
    </RoutesReact>
  );
};

export default Routing;