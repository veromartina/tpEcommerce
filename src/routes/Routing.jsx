import { Route, Routes as RoutesReact } from "react-router-dom";
import { Register }  from '../pages/auth/Register';
import Home  from '../pages/Home';  
import { Login }  from "../pages/auth/Login";

const Routing = () => {
  return (
    <RoutesReact>
  
      <Route path="/" element={<Home />} />  
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </RoutesReact>
  );
};

export default Routing;