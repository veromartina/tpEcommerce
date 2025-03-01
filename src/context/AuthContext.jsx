
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom"; 
import {  Box, CloseButton, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); 
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        
    });

    return () => unsubscribe(); // Evitar fugas de memoria
  }, []);

  
  const showAlert = (title, description, status) => {
    setAlert({ title, description, status });
    setTimeout(() => setAlert(null), 4000);
  };


  // Función de registro
  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      showAlert("Registro exitoso", "Tu cuenta ha sido creada con éxito.", "success");
      navigate("/"); 

    } catch (error) {
     console.log(error)
      showAlert("Error al registrarse");
    }
  };  

  // Función de login con correo y contraseña
  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      showAlert("Inicio de sesión exitoso", "Has iniciado sesión correctamente.", "success");
      navigate("/");

    } catch (error) {
      console.log(error.code, error.message);
      showAlert("Error al iniciar sesión", error.message, "error");
    }
  };

    // Función de login con google
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
    
      try {
        await signOut(auth);
        localStorage.clear(); // Borra almacenamiento local
        sessionStorage.clear(); // Borra la sesión actual
        document.cookie.split(";").forEach((c) => { // Borra cookies
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.log("Error en inicio con Google:", error.message);
        showAlert("Error al iniciar sesión", error.message, "error");
      }
    };
  //  Función para cerrar sesión con redirección
 
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      showAlert("Sesión cerrada", "Has cerrado sesión correctamente.", "info");
      navigate("/");
     
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, login, logout, signInWithGoogle }}>
       {alert && (
        <Box position="fixed" top="20px" left="50%" transform="translateX(-50%)" zIndex={1000} width="80%" maxW="400px">
          <Alert status={alert.status} variant="subtle" flexDirection="column" alignItems="center" textAlign="center" borderRadius="md" boxShadow="lg">
            <AlertIcon boxSize="40px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">{alert.title}</AlertTitle>
            <AlertDescription maxWidth="sm">{alert.description}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlert(null)} />
          </Alert>
        </Box>
      )}

      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);