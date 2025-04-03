import React, { useState } from "react";
import { Menu } from '../components/Menu.jsx';
import userImg from './../covers/user.png';
import { Button, Spinner } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import NavbarWeb from "../components/NavbarWeb.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useGetAchievementsPostsQuery, useGetAchievementsQuery, useGetBlogpostsByAccountQuery, useGetBlogpostsQuery, useGetCarbonQuery, useGetFavoritesQuery, useGetUserQuery } from "../features/fetchFirebase.jsx";
import Heading from "../components/Base/Heading.jsx";
import { ActionCard } from "../components/Profile/ActionCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export function Profile() {
    const { accountId } = useParams();
    const { data: favoriteData, isLoading, isError, error } = useGetFavoritesQuery(accountId);
    const { data: carbonData, isLoading: carbonIsLoading, isError: carbonIsError } = useGetCarbonQuery(accountId);
    const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);
    const { data: achievementsData, isLoading: achievementsIsLoading, isError: achievementsIsError } = useGetAchievementsQuery(accountId);
    const { data: blogpostsAccount, isLoading: blogpostsAccountIsLoading, isError: blogpostsAccountIsError } = useGetBlogpostsByAccountQuery(accountId);
    const { data: achievementsPosts, isLoading: achievementsPostsIsLoading, isError: achievementsPostsIsError } = useGetAchievementsPostsQuery(accountId);
    console.log("blogpostsAccount", blogpostsAccount);
    console.log("achievementsPosts", achievementsPosts);

    const accountEmail = accountData?.account.email;

    const [actionSection, setActionSection] = useState(true);
    const [achievementsSection, setAchievementsSection] = useState(false);
    const [blogpostsSection, setBlogpostsSection] = useState(false);

    const handleActionSection = () => {
        setActionSection(true);
        setAchievementsSection(false);
        setBlogpostsSection(false);
    }

    const handleAchievementsSection = () => {
        setAchievementsSection(true);
        setBlogpostsSection(false);
        setActionSection(false);
    }

    const handleBlogpostsSection = () => {
        setBlogpostsSection(true);
        setAchievementsSection(false);
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
                        <div className="text-white p-4">

                            <section className="flex flex-col gap-2 my-4">
                                <h1 className="invisible h-0">Mi perfil</h1>
                                <Heading tag="h2" size="h6" color="white" align="center">
                                    ¡Hola {accountEmail}!
                                </Heading>
                                <div className="animate__animated animate__pulse">
                                    <img src={userImg} alt="Foto de perfil" className="bg-white max-w-28 max-h-28 rounded-full mx-auto border-4 borderOrangeProfile shadow-md" />
                                </div>
                                <div>
                                    <p className="text-center text-white text-base">Mi huella de carbono de este mes:</p>
                                    <p className="font-bold text-center textOrange text-lg animate__animated animate__pulse">{!carbonIsLoading ? `${accountData?.account.carbon} kg de CO2` : "Cargando..."}</p>
                                </div>
                            </section>
                            {/* 
                            <div className="ms-[2%] mb-[-1rem] flex gap-2 w-fit">
                                <Link to={`/perfil/${accountId}`}>
                                    <div className={`font-bold rounded-t-[30px] pt-3 p-2 px-3 text-sm cursor-pointer hover:opacity-90 transition-all ${actionSection ? "backgroundWhite text-[#242424]" : "bg-[#00412f] text-white"}`} onClick={handleActionSection}>Acciones en proceso</div>
                                </Link>
                                <Link to={`/perfil/${accountId}/logros`}>
                                    <div className={`font-bold rounded-t-[30px] pt-3 p-2 px-3 text-sm cursor-pointer hover:opacity-90 transition-all ${achievementsSection ? "backgroundWhite text-[#242424]" : "bg-[#00412f] text-white"}`} onClick={handleAchievementsSection}>Mis logros</div>
                                </Link>
                                <Link to={`/perfil/${accountId}/blogposts`}>
                                    <div className={`font-bold rounded-t-[30px] pt-3 p-2 px-3 text-sm cursor-pointer hover:opacity-90 transition-all ${blogpostsSection ? "backgroundWhite text-[#242424]" : "bg-[#00412f] text-white"}`} onClick={handleBlogpostsSection}>Mis blogposts</div>
                                </Link>
                            </div> */}

                        </div>
                        {actionSection &&
                            <section className="pb-8 backgroundWhite mx-auto p-4 pt-8 rounded-t-[30px] ">
                                <Heading tag="h2" size="h6" align="center">
                                    Mis acciones en proceso
                                </Heading>

                                <div> {isLoading ?
                                    <div className="flex justify-center">
                                        <Spinner color="success" />
                                    </div>
                                    :
                                    <div className="mx-auto lg:max-w-screen-lg">
                                        {favoriteData?.length === 0 ? (
                                            <div className="p-2">
                                                <p className="block">Aún no hay acciones en proceso.</p>
                                            </div>
                                        ) : (
                                            <Swiper
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                navigation={true}
                                                pagination={{ clickable: true }}
                                                loop={false}
                                                modules={[Navigation, Pagination]}
                                                className=""
                                                breakpoints={{
                                                    320: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 10,
                                                    },
                                                    480: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 20,
                                                    },
                                                    768: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 30,
                                                    },
                                                    1024: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 40,
                                                    },
                                                }}
                                            >
                                                {accountData?.account?.favorites?.map((fav) => (
                                                    <SwiperSlide key={fav._id}>
                                                        <ActionCard fav={fav} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        )}
                                    </div>
                                }
                                </div>
                                <div className="flex justify-center mt-6 pb-8">
                                    <Link to={`/acciones/${accountId}`} className="hover:font-bold transition-all">
                                        Agregar una acción <span className="ml-6">+</span>
                                    </Link>
                                </div>
                            </section>
                        }
                        {achievementsSection &&
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
                                                    <Link key={a.id} to={`/achievementpost/${a?._id}`}>
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
                        {blogpostsSection &&
                            <div className="pb-8 backgroundWhite mx-auto px-8 p-4 pt-8 rounded-t-[30px] ">
                                <h2 className="text-2xl font-semibold p-2">Mis blogposts</h2>
                                <div className="flex justify-center mt-6 pb-8">

                                    <Button className="backgroundDarkGreen text-white flex justify-between items-center font-semibold text-base">
                                        <Link to={`/logros/${accountId}`} className="hover:text-white">
                                            Agregar un blogpost <span className="ml-6">+</span>
                                        </Link>
                                    </Button>

                                </div>
                                <div> {isLoading ?
                                    <div className="flex justify-center">
                                        <Spinner color="success" />
                                    </div>
                                    :
                                    <div>
                                        {blogpostsAccount?.length === 0 ?
                                            <div className="p-2">
                                                <p className="block">Aún no hay posteos publicados.</p>
                                            </div>
                                            :
                                            <ul className="md:flex flex-wrap min-h-32">
                                                {blogpostsAccount.map((b =>
                                                    <Link key={b.id} to={`/blogpost/${b?._id}`}>
                                                        <div key={b?._id}
                                                            className="backgroundDarkGreen rounded-lg p-2 shadow-xl flex flex-col items-center m-2 md:w-48">
                                                            <img src={b?.image} alt={b?.title} className="w-48 object-cover rounded-lg" />
                                                            <div className="p-2 m-1 text-white">
                                                                <h3 className="text-xl mb-2">{b?.title}</h3>
                                                                <p className="text-base text-white">{b?.category}</p>
                                                                <p className="text-base text-white">{b?.achievement}</p>
                                                                <p className="text-base text-white">{b?.description}</p>
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


