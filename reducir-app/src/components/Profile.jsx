import React, { useState } from "react";
import { Menu } from './Menu.jsx';
import userImg from './../covers/user.png';
import { Button, Spinner } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import NavbarWeb from "./NavbarWeb.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useGetAchievementsPostsQuery, useGetAchievementsQuery, useGetBlogpostsQuery, useGetCarbonQuery, useGetFavoritesQuery, useGetUserQuery } from "../features/fetchFirebase.jsx";

export function Profile() {
    const { accountId } = useParams();
    const { data: favoriteData, isLoading, isError, error } = useGetFavoritesQuery(accountId);
    const { data: carbonData, isLoading: carbonIsLoading, isError: carbonIsError } = useGetCarbonQuery(accountId);
    const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);
    const { data: achievementsData, isLoading: achievementsIsLoading, isError: achievementsIsError } = useGetAchievementsQuery(accountId);
    const { data: achievementsPosts, isLoading: achievementsPostsIsLoading, isError: achievementsPostsIsError } = useGetAchievementsPostsQuery(accountId);
    console.log("achievementsPosts", achievementsPosts);
    console.log("favoriteData", favoriteData);
    console.log("accountData?.account.favorites", accountData?.account.favorites);
    //const accountId = auth?.user?.uid;
    const accountEmail = accountData?.account.email;
    console.log("carbonData", carbonData?.carbon);
    const [actionSection, setActionSection] = useState(true);
    const [blogpostsSection, setBlogpostsSection] = useState(false);

    const handleActionSection = () => {
        setActionSection(true);
        setBlogpostsSection(false);
    }

    const handleBlogpostsSection = () => {
        setBlogpostsSection(true);
        setActionSection(false);
    }

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
                            <h2 className="text-2xl font-bold text-center mb-4 text-white">¡Hola {accountEmail}!</h2>
                            <div className="animate__animated animate__pulse">
                                <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 borderOrangeProfile shadow-md" />
                            </div>
                            <p className="text-center mt-4 text-white text-[18px]">Mi huella de carbono de este mes:</p>
                            <p className="font-bold text-center mb-8 textOrange text-[20px] animate__animated animate__pulse">{!carbonIsLoading ? `${accountData?.account.carbon} kg de CO2` : "Cargando..."}</p>
                            <div className="ms-[2%] mb-[-1rem] flex gap-2 w-fit">
                                <div className={`font-bold rounded-t-[30px] pt-3 p-2 px-3 text-sm cursor-pointer hover:opacity-90 transition-all ${actionSection ? "backgroundWhite text-[#242424]" : "bg-[#00412f] text-white"}`} onClick={handleActionSection}>Acciones en proceso</div>
                                <div className={`font-bold rounded-t-[30px] pt-3 p-2 px-3 text-sm cursor-pointer hover:opacity-90 transition-all ${blogpostsSection ? "backgroundWhite text-[#242424]" : "bg-[#00412f] text-white"}`} onClick={handleBlogpostsSection}>Mis logros</div>
                            </div>
                        </div>
                        {actionSection &&
                            <div className="pb-8 backgroundWhite mx-auto px-8 p-4 pt-8 rounded-t-[30px] ">
                                <h2 className="text-2xl font-semibold p-2">Mis acciones en proceso</h2>

                                <div> {isLoading ?
                                    <div className="flex justify-center">
                                        <Spinner color="success" />
                                    </div>
                                    :
                                    <div>
                                        {favoriteData?.length === 0 ?
                                            <div className="p-2">
                                                <p className="block">Aún no hay acciones en proceso.</p>
                                            </div>
                                            :
                                            <ul className="md:flex flex-wrap min-h-32">
                                                {accountData?.account.favorites.map((fav =>
                                                    <div key={fav?._id}
                                                        className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                                        <img src={fav?.image} alt={fav?.alt} className="w-48 rounded-lg" />
                                                        <div className="p-2 m-1 text-white">
                                                            <h3 className="text-xl mb-2">{fav.title}</h3>
                                                            <p className="text-base text-white">CO2: -{fav.carbon} kg</p>
                                                            <div className="flex justify-end mt-4">
                                                                <Link to={`/accion/${fav._id}`} className="font-bold text-white hover:textWhite">Ver detalles</Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))}</ul>
                                        }
                                    </div>
                                }
                                </div>
                                <div className="flex justify-center mt-6 pb-8">

                                    <Button className="backgroundDarkGreen text-white flex justify-between items-center font-semibold text-base">
                                        <Link to={`/acciones/${accountId}`} className="hover:text-white">
                                            Agregar una acción <span className="ml-6">+</span>
                                        </Link>
                                    </Button>

                                </div>
                            </div>
                        }
                        {blogpostsSection &&
                            <div className="pb-8 backgroundWhite mx-auto px-8 p-4 pt-8 rounded-t-[30px] ">
                                <h2 className="text-2xl font-semibold p-2">Mis logros</h2>
                                <div className="flex justify-center mt-6 pb-8">

                                    <Button className="backgroundDarkGreen text-white flex justify-between items-center font-semibold text-base">
                                        <Link to={`/logros/${accountId}`} className="hover:text-white">
                                            Agregar un logro <span className="ml-6">+</span>
                                        </Link>
                                    </Button>

                                </div>
                                <div> {isLoading ?
                                    <div className="flex justify-center">
                                        <Spinner color="success" />
                                    </div>
                                    :
                                    <div>
                                        {achievementsPosts?.length === 0 ?
                                            <div className="p-2">
                                                <p className="block">Aún no hay posteos publicados.</p>
                                            </div>
                                            :
                                            <ul className="md:flex flex-wrap min-h-32">
                                                {achievementsPosts.map((a =>
                                                    <Link to={`/achievementpost/${a?._id}`}>
                                                        <div key={a?._id}
                                                            className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                                            <img src={a?.image} alt={a?.title} className="w-48 rounded-lg" />
                                                            <div className="p-2 m-1 text-white">
                                                                <h3 className="text-xl mb-2">{a?.title}</h3>
                                                                <p className="text-base text-white">{a?.achievement}</p>
                                                                <p className="text-base text-white">{a?.description}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}</ul>
                                        }
                                    </div>
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="block lg:hidden mt-8 lg:mt-0">
                <Menu></Menu>
            </div>
        </>
    );
}


