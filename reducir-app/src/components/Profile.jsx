import React, { useEffect, useState } from "react";
import { Menu } from './Menu.jsx'; 
import userImg from './../covers/user.png';
import { Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    console.log(auth.user.uid);
    const userId = auth.user.uid;
    const displayEmail = auth.user.email;

    const favorites = useSelector(selectFavoriteAction);
    const loading = useSelector(selectLoading);
    const [carbon, setCarbon] = useState(null); // Nuevo estado para almacenar el valor de "carbon"

    useEffect(() => {         
        dispatch(setLoading(true));

        const userRef = doc(db, `users/${userId}`);
        console.log(userId);
        // Utiliza onSnapshot para suscribirte al documento del usuario
        const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            // Si el documento existe, accede al campo deseado (en este caso, "favorites")
            const favorites = docSnapshot.data()["favorites"] || [];
            dispatch(setFavorites(favorites));

            const userCarbon = docSnapshot.data()["carbon"] || null;
            setCarbon(userCarbon);

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

            <div className="flex-1 pb-8">
            <NavbarWeb></NavbarWeb>
                <div className="backgroundDarkGreen shadow-md container mx-auto">
                    <div className="mb-2 text-white p-4">
                        <h1 className="invisible">Mi perfil</h1>  
                        <h2 className="text-2xl font-bold text-center mb-4">¡Hola {displayEmail}!</h2>
                        <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 border-white shadow-md" />
                        
                        <p className="text-center mt-4">Mi huella de carbono este mes:</p>
                        <p className="font-bold text-center mb-8">{carbon !== null ? `${carbon} kg de CO2` : "Cargando..."}</p>
                    </div>
                    <div className="pb-8 h-full backgroundWhite mx-auto container px-8 p-4 pt-8 rounded-t-[30px]">
                        <h2 className="text-2xl font-semibold p-2">Mis acciones en proceso</h2>
                       
                        <div> {loading ? 
                            <div className="flex justify-center">
                                <Spinner color="success" />
                            </div>
                            :
                            <div>
                            {favorites.length === 0 ?
                                <div className="p-2">
                                    <p className="block">Aún no hay acciones en proceso.</p>
                                </div>
                            :
                            <ul className="md:flex flex-wrap min-h-32">
                            {favorites?.map((fav => 
                                <div key={fav.actionId}
                                className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                <img src={fav.imageCard} alt={fav.titleCard} className="w-48 rounded-lg" />
                                <div className="p-2 m-1 text-white">
                                    <h3 className="text-xl mb-2">{fav.titleCard}</h3>
                                    <p className="text-base">CO2: - 100kg</p>
                                    <div className="flex justify-end mt-4">
                                        <Link to={`/accion/${fav.actionId}`} className="font-bold text-white hover:textWhite">Ver detalles</Link>
                                    </div>
                                </div>
                                </div>
                                
                            ))}</ul>
                            }
                            </div>
                        }
                    
                        </div>
                        <div className="flex justify-center mt-6 pb-8">
                        
                            <Button className="backgroundDarkGreen text-white flex justify-between items-center">
                                <Link to="/acciones" className="hover:text-white">Agregar una acción <span className="ml-6">+</span>  
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


