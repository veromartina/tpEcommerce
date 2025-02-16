
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Importo métodos necesarios para Google

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para login con Google
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider(); // Configuración del proveedor de Google
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user.uid);
        console.log("Usuario autenticado con Google: ", user);
      })
      .catch((error) => {
        console.error("Error con Google Auth: ", error.code, error.message);
      });
  };
  
    // Función de login con correo y contraseña
  const login = ({email, password})=>{
signInWithEmailAndPassword(auth, 
  email,
  password)
  .then((userCredential)=>{
    const user = userCredential.user;
    setUser(user.uid)
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  };
  
   // Función de registro
  const registerUser = async ({email, password})=> {
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, 
        email,
        password)
        console.log(userCredential)
  
    const user = userCredential.user;
  
  return user

        }catch(error) {
            const errorCode = error.code;
            const errorMessage =error.message;
            console.log(errorCode, errorMessage)
        };
    }
        return (
    <AuthContext.Provider value={{ user,registerUser, login, loginWithGoogle }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)