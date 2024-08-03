import React, { useState } from 'react';
import { Menu } from '../components/Menu';
import Sidebar from '../components/Sidebar';
import { useGetAchievementsPostsQuery } from '../features/fetchFirebase';
import userImg from '../covers/user.png';
import { Button, Chip, User } from "@nextui-org/react";
import { Link, useParams } from 'react-router-dom';

export function AllAchievementsPosts() {
    const accountId = localStorage.getItem('_id');
    const { categoria: category } = useParams();
    const { data: achievements, isLoading: achievementsIsLoading, isError: achievementsIsError } = useGetAchievementsPostsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmedSearchTerm, setConfirmedSearchTerm] = useState("");

    const handleSearch = () => {
        setConfirmedSearchTerm(searchTerm);
    };

    // Filtramos primero por categoría y luego por el término de búsqueda confirmado
    const filteredAchievements = achievements
        ?.filter(a => !category || a.category === category)
        ?.filter(a =>
            confirmedSearchTerm
                ? a.title.toLowerCase().includes(confirmedSearchTerm.toLowerCase()) ||
                a.description.toLowerCase().includes(confirmedSearchTerm.toLowerCase())
                : true
        );

    console.log("filteredAchievements?.length === 0", filteredAchievements?.length === 0);
    return (
        <>
            <div className="lg:flex">
                <template className="hidden lg:block">
                    <Sidebar />
                </template>
                <div className="p-4 mx-4">
                    <h1 className="mb-2">Comunidad</h1>
                    <div className="font-bold py-2">
                        <Link to={`/blogpost`} className="flex gap-1 textDarkGreen">
                            <span className=""><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 16V32M16 24H32M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#005840" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></span>
                            Agregar un post</Link>
                    </div>
                    <div className="flex gap-2 pt-4 pb-4 container mx-auto">
                        <Link to={`/logros/inicio`}>
                            <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Todas</Chip>
                        </Link>
                        <Link to={`/logros/inicio/energia`}>
                            <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Energía</Chip>
                        </Link>
                        <Link to={`/logros/inicio/reciclaje`}>
                            <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Reciclaje</Chip>
                        </Link>
                        <Link to={`/logros/inicio/agua`}>
                            <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Agua</Chip>
                        </Link>
                    </div>
                    <div className="my-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <Button
                            onClick={handleSearch}
                            className="ml-2 p-2 backgroundDarkGreen text-white hover:opacity-90 transition-all"
                        >
                            Buscar
                        </Button>
                    </div>
                    <div className="">
                        {filteredAchievements?.map((b) => (
                            <Link to={`/blogpost/${b?._id}`} key={b?._id}>
                                <div className="p-4 max-w-2xl mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden">
                                    <div>
                                        <p>Logro: {b?.achievement}</p>
                                        <p>Categoría: {b?.category}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <User
                                                name={b?.email}
                                                description={b?.title}
                                                avatarProps={{
                                                    src: userImg
                                                }}
                                            />
                                            <p className="mt-2 text-gray-600">{b?.description}</p>
                                        </div>
                                    </div>
                                    <div className="pb-6">
                                        <img className="shadow w-[60%] mx-auto object-cover rounded-lg" src={b?.image} alt={b?.title} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {filteredAchievements?.length === 0 &&
                        <>
                            <div>No hay publicaciones disponibles con esa categoría.</div>
                        </>}
                </div>
            </div>
            <div className="block lg:hidden mt-8 lg:mt-0">
                <Menu />
            </div>
        </>
    );
}