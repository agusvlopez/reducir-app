import React, { useEffect } from "react";
import { Menu } from './Menu.jsx'; 
import userImg from './../covers/user.png';
import { Button, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import NavbarWeb from "./NavbarWeb.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, selectFavoriteAction, selectLoading, setFavorites, setLoading } from "../features/favoritesSlice.jsx";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";


export function Profile () {
    const dispatch = useDispatch();
    const auth = useAuth();
    console.log(auth.user.uid);
    const userId = auth.user.uid;
    const displayEmail = auth.user.email;

    const favorites = useSelector(selectFavoriteAction);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(setLoading(true));
    
        console.log("Entre al useEffect del HorizontalCard");
    
        const userRef = doc(db, `users/${userId}`);
      
        // Utiliza onSnapshot para suscribirte al documento del usuario
        const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            // Si el documento existe, accede al campo deseado (en este caso, "favorites")
            const favorites = docSnapshot.data()["favorites"] || [];
            dispatch(setFavorites(favorites));
            dispatch(setLoading(false));
          }      
        });
    
        return () => {
          // Desuscribirse cuando el componente se desmonte
          unsubscribeUser();
        };
      }, [userId, dispatch]);
      
    console.log(favorites);

    return (
        <>
        <div className="lg:flex container">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

            <div className="flex-1 ">
            <NavbarWeb></NavbarWeb>
                <div className="backgroundWhite min-h-full shadow-md rounded px-8 pb-8 mb-8 mx-auto container">
                    <div className="mb-2">
                        <h1 className="invisible">Mi perfil</h1>  
                        <h2 className="text-2xl font-bold text-center mb-4">¡Hola {displayEmail}!</h2>
                        <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 border-white shadow-md" />
                        
                        <p className="text-gray-600 text-center mt-4">Mi huella de carbono este mes:</p>
                        <p className="font-bold text-center">72kg de CO2</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold p-2">Mis acciones en proceso</h2>
                       
                        <div> {loading ? 
                            <div className="flex justify-center">
                                <Spinner color="success" />
                            </div>
                            :
                            <ul className="flex min-h-32">
                            {favorites?.map((fav => 
                                <div key={fav.actionId}
                                className="backgroundDarkGreen rounded-lg p-4 shadow-xl flex flex-col lg:flex-row  items-center ">
                                <img src={fav.imageCard} alt="" className="w-32 h-32 rounded-lg" />
                                <div className="p-2 m-1 text-white">
                                    <h3 className="text-xl mb-2">{fav.titleCard}</h3>
                                    <p className="text-base">CO2: - 100kg</p>
                                </div>
                                </div>
                            ))}
                            </ul>
                        }
                        </div>
                        <div className="flex justify-center mt-6 mb-8">
                        <Link to="/acciones">
                            <Button className="buttonDarkGreen">Agregar un acción <span className="ml-6">+</span> </Button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
        <div className="block lg:hidden">
            <Menu></Menu>
        </div>
        </>
    );
}


