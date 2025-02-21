//registro el pedido en firebase
export const createOrder = async (products, uid) => {
  if (!uid) throw new Error("No hay usuario autenticado"); 

  try {
    const orderDocRef = await addDoc(collection(db, "orders"), {
      user_id: uid,
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
      
      })),
      createdAt: new Date(),
    });

    console.log("Pedido creado con ID:", orderDocRef.id);
    return orderDocRef;
  } catch (error) {
    console.error("Error creando el pedido:", error);
    throw error;
  }
};