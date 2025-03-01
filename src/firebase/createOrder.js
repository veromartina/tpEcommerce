//registro el pedido en firebase

import { db } from "../firebase/config";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

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
        stock: product.stock,
        cant: product.quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      createdAt: new Date(),
    });

    //  Actualizar stock en Firebase 
    for (const item of cart) {
      const productRef = doc(db, "productos", item.id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock;
        await updateDoc(productRef, {
          stock: currentStock - item.quantity,
        });
      }
    }

    console.log("Pedido creado con ID:", orderDocRef.id);
    return orderDocRef;
  } catch (error) {
    console.error("Error creando el pedido:", error);
    throw error;
  }
};

