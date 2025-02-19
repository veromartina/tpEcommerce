import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Función para crear el pedido en Firestore
export const createOrder = async (products, uid) => {
  try {
    const orderDocRef = await addDoc(collection(db, "orders"), {
      user_id: uid,
      products: products.map(product => ({
        name: product.name,
        image_url: product.image_url,
        price: product.price,
      })),
      createdAt: new Date(),
    });
    console.log("Order created with ID: ", orderDocRef.id);
    return orderDocRef;
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
};
 
 
 /*
 import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/config"


//creo el pedido u orden
export const createOrder =async (name, uid, image_url, price ) =>{
  
        const doc = await addDoc(collection(db, "order"), {
        name,
        image_url,
        price,
        uid,
        });
        console.log("Document written with ID: ", doc.id);
        
        return doc
}   */