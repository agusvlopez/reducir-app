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
        console.log(userId);
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

            <div className="flex-1">
            <NavbarWeb></NavbarWeb>
                <div className="backgroundDarkGreen shadow-md rounded container">
                    <div className="mb-2 text-white p-4">
                        <h1 className="invisible">Mi perfil</h1>  
                        <h2 className="text-2xl font-bold text-center mb-4">¡Hola {displayEmail}!</h2>
                        <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 border-white shadow-md" />
                        
                        <p className="text-center mt-4">Mi huella de carbono este mes:</p>
                        <p className="font-bold text-center mb-8">72kg de CO2</p>
                    </div>
                    <div className="pb-8 h-fit backgroundWhite mx-auto container px-8 p-4 pt-8 rounded-t-[30px]">
                        <h2 className="text-2xl font-semibold p-2">Mis acciones en proceso</h2>
                       
                        <div> {loading ? 
                            <div className="flex justify-center">
                                <Spinner color="success" />
                            </div>
                            :
                            <ul className="md:flex md:flex-wrap min-h-32">
                            {favorites?.map((fav => 
                                <div key={fav.actionId}
                                className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                <img src={fav.imageCard} alt={fav.titleCard} className="w-48 h-48 rounded-lg" />
                                <div className="p-2 m-1 text-white">
                                    <h3 className="text-xl mb-2">{fav.titleCard}</h3>
                                    <p className="text-base">CO2: - 100kg</p>
                                    <div className="flex justify-end mt-4">
                                        <Link to={`/accion/${fav.actionId}`} className="font-bold text-white hover:textWhite">Ver detalles</Link>
                                    </div>
                                </div>
                                </div>
                            ))}
                            </ul>
                        }
                        </div>
                        <div className="flex justify-center mt-6 mb-8">
                        
                            <Button className="backgroundDarkGreen text-white  flex justify-between items-center">
                                <Link to="/acciones" className="hover:text-white">Agregar un acción <span className="ml-6">+</span>  
                                </Link></Button>
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


