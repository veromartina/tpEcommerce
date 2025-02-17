import React, { useState } from "react";
import { CreateOrder } from "../services/orders";
import { useAuth } from "../context/AuthContext"

export const Create = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth()
  console.log(user)


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDEfault();
    setLoading(true);

    try {
      const order = await CreateOrder(values.name);
      console.log(order);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Crear pedido</h1>
      <div>
        <input
          type="text"
          value={values.name}
          onChange={handleChange}
          name="name"
        />
      </div>
      {error && <p>error</p>}
      <button type="submit">{loading ? "creando.." : "crear pedido"}</button>
    </form>
  )
}


