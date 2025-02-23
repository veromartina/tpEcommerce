//registro el pedido en firebase
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
export const createOrder = async (cart, uid) => {
  if (!uid) throw new Error("No hay usuario autenticado"); 

  try {
    const orderDocRef = await addDoc(collection(db, "orders"), {
      user_id: uid,
      products: cart.map(product => ({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
      //quantity: product.quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), // 💡 Guarda el total
      createdAt: new Date(),
    });

    console.log("Pedido creado con ID:", orderDocRef.id);
    return orderDocRef;
  } catch (error) {
    console.error("Error creando el pedido:", error);
    throw error;
  }
};