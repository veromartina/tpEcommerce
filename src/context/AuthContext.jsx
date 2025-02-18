
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"; // Importo métodos necesarios para Google
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast()

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
        console.log("Error con Google Auth: ", error.code, error.message);
      });
  };
  
    // Función de login con correo y contraseña
  const login = ({email, password})=>{
signInWithEmailAndPassword(auth, 
  email,
  password)

  .then((userCredential)=>{
    const user = userCredential.user;
     setUser(user.uid); // Actualiza el estado del usuario
     console.log(user)
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error de inicio de sesión: ", errorCode, errorMessage)
  });
  };
  
   // Función de registro
  const registerUser = async ({email, password})=> {
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, 
        email,
        password)
        const user = userCredential.user;
        console.log(userCredential)

        setUser(user.uid); // Actualiza el estado del usuario
        console.log(user); 
  
  return user;

        }catch(error) {
            const errorCode = error.code;
            const errorMessage =error.message;
           
    // Verifica si el error es de "email already in use"
    if (errorCode === "auth/email-already-in-use") {
      console.log("Este correo ya está en uso");
     
    } else {
      console.log("Error de registro: ", errorCode, errorMessage);
    }
  } 
        };
 
        //deslogearse
const logout = ()=> {
  signOut(auth)
  .then(()=>{
    toast({
      title:"Sign off correct",
      status: "info",
      isClosable: true,
    duration:3000, 
     })
  })
  .catch((error) => {
    console.log(error)
  })
}

        return (
    <AuthContext.Provider value={{ user,registerUser, login, logout, loginWithGoogle }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)