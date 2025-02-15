import React from 'react';
import { Route, Routes as RoutesReact } from "react-router-dom";
import { Register } from '../pages/auth/Register';
import Home from '../pages/Home';  
const Routing = () => {
  return (
    <RoutesReact>
      {/* Ruta principal (raíz) */}
      <Route path="/" element={<Home />} />  
   
      <Route path="/register" element={<Register />} />
    </RoutesReact>
  );
};

export default Routing;