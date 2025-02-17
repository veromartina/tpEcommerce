import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/config"


//creo el pedido u orden
export const CreateOrder =async (name, uid) =>{
  
        const doc = await addDoc(collection(db, "order"), {
        name,
        uid,
        isCompleted: false,
        });
        console.log("Document written with ID: ", doc.id);
        
        return doc
}