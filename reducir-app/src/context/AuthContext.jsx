//PARA GLOBALIZAR LAS FUNCIONES DE FIREBASE A TODA NUESTRA APLICACIÓN
//en este caso referido a la autenticacion, para que toda la app tenga acceso al usuario logueado
import React, {useState, useEffect} from "react";
import { auth } from "../firebase/firebase.config";
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { createUserProfile } from "../services/user";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    
    if(!context){
        console.log("error creating auth context");
    }
    return context;
}

let userData = {
    id: null,
    email: null,
}
//se va a encargar de globalizar todo nuestro contexto
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    //Si el usuario figuraba como autenticado, lo marcamos como tal inmediatamente.

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
                
            if(!currentUser && localStorage.getItem('user')){
                currentUser = JSON.parse(localStorage.getItem('user'));
            };
            if(!currentUser){
                console.log("No hay usuario suscrito");
                setUser(null);
                localStorage.removeItem('user');
                
            }else {
                setUser(currentUser);
                userData = {
                    id: currentUser.uid,
                    email: currentUser.email,
                }
                localStorage.setItem('user', JSON.stringify(userData))
            }
        })
        return () => suscribed()
    }, []);

    const register = async (email, password, favorites, rol, carbon) => {
          try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            createUserProfile(response.user.uid, {email, favorites, rol, carbon});
            console.log(response);

             return {
                 id: response.user.uid,
                 email: response.user.email,
                 favorites: favorites,
                 rol: rol,
                 carbon, carbon
             }  
         } catch (error) {
             return {
                 code: error.code,
                 message: error.message,
             }
         }
    }

    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        
    }

    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider();
        return await signInWithPopup(auth, responseGoogle);
    }

    const logout = async () => {
        const response = await signOut(auth);
        console.log(response);
        localStorage.removeItem('user');
    }

    return <authContext.Provider value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,

    }}>
        {children}
    </authContext.Provider>
}