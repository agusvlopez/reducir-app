import React from "react";
import { Menu } from './Menu.jsx'; 
import userImg from './../covers/user.png';
import { Button, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import NavbarWeb from "./NavbarWeb.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useGetCarbonQuery, useGetFavoritesQuery } from "../features/fetchFirebase.jsx";

export function Profile () {
    const auth = useAuth();
    const userId = auth?.user?.uid;
    const displayEmail = auth?.user?.email;
    const {data: favoriteData, isLoading, isError, error} = useGetFavoritesQuery(userId);
    const {data: carbonData, isLoading: carbonIsLoading, isError: carbonIsError} = useGetCarbonQuery(userId);      
    
    return (
        <>
        <div className="lg:flex">
            <template className="hidden lg:block ">
                <Sidebar />
            </template>

            <div className="flex-1">
                <div className="backgroundTrama mx-auto w-full">
                    <div className=" text-white p-4">
                        <h1 className="invisible">Mi perfil</h1>  
                        <h2 className="text-2xl font-bold text-center mb-4 text-white">¡Hola {displayEmail}!</h2>
                        <div className="animate__animated animate__pulse">
                            <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 borderOrangeProfile shadow-md" />  
                        </div>     
                        <p className="text-center mt-4 text-white text-[18px]">Mi huella de carbono de este mes:</p>
                        <p className="font-bold text-center mb-8 textOrange text-[20px] animate__animated animate__pulse">{!carbonIsLoading ? `${carbonData} kg de CO2` : "Cargando..."}</p>
                    </div>
                    <div className="pb-8 backgroundWhite mx-auto px-8 p-4 pt-8 rounded-t-[30px] ">
                        <h2 className="text-2xl font-semibold p-2">Mis acciones en proceso</h2>
                       
                        <div> {isLoading ? 
                            <div className="flex justify-center">
                                <Spinner color="success" />
                            </div>
                            :
                            <div>
                            {favoriteData.length === 0 ?
                                <div className="p-2">
                                    <p className="block">Aún no hay acciones en proceso.</p>
                                </div>
                            :
                            <ul className="md:flex flex-wrap min-h-32">
                            {favoriteData?.favorites.map((fav => 
                                <div key={fav.actionId}
                                className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                    <img src={fav.imageCard} alt={fav.titleCard} className="w-48 rounded-lg" />
                                    <div className="p-2 m-1 text-white">
                                        <h3 className="text-xl mb-2">{fav.titleCard}</h3>
                                        <p className="text-base text-white">CO2: - {fav.carbonCard}</p>
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
                            <Link to="/acciones" className="hover:text-white">  
                                <Button className="backgroundDarkGreen text-white flex justify-between items-center font-semibold text-base">
                                    Agregar una acción <span className="ml-6">+</span>   
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
        <div className="block lg:hidden mt-8 lg:mt-0">
            <Menu></Menu>
        </div>
        </>
    );
}


