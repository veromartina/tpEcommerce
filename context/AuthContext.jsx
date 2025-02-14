import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  //const login = ({username, password}) => {
   
 // };

 // const logout = () => {
   
  //};

  const registerUser = async ({email, password})=> {
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, 
        email,
        password)
  
    const user = userCredential.user;
  
  return user
        }catch(error) {
            const errorCode = error.code;
            const errorMessage =error.message;
            console.log(errorCode, errorMessage)
        };
    }
        return (
    <AuthContext.Provider value={{ user,registerUser}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)