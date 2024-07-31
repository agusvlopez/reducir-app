import React, { useState } from 'react';
import { Link } from "react-router-dom";
import user from '../covers/icons/user-icon.png';
import actions from '../covers/icons/actions-icon.png';
import achievements from '../covers/icons/achievements-icon.png';
import benefits from '../covers/icons/benefits-icon.png';
import config from '../covers/icons/config-icon.png';

const Sidebar = () => {
    const accountId = localStorage.getItem('_id');
    const sidebarRoutes = [];

    sidebarRoutes.push({
        id: 3,
        path: `/perfil/${accountId}`,
        name: 'Perfil',
        icon: user,
        alt: 'Mi perfil',
    });

    sidebarRoutes.push({
        id: 6,
        path: `/acciones/${accountId}`,
        name: 'Acciones',
        icon: actions,
    });

    sidebarRoutes.push({
        id: 7,
        path: `/logros/${accountId}`,
        name: 'Logros',
        icon: achievements,
    });

    sidebarRoutes.push({
        id: 8,
        path: '/beneficios',
        name: 'Beneficios',
        icon: benefits,
    });
    sidebarRoutes.push({
        id: 8,
        path: '/blog',
        name: 'Blog',
        icon: benefits,
    });
    const [isOpen, setIsOpen] = useState(true);
    const toggleBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-r w-fit p-4 container backgroundWhite">
            <div className={`h-screen ${isOpen ? 'w-36' : 'w-fit'} p-4 transition-all duration-300 ease-in-out`}>
                <button onClick={toggleBar} className="py-1 px-1 sidebarButton">
                    <span className={`${isOpen ? 'exitIcon' : 'moreIcon'} transition-all duration-300 ease-in-out `}></span>
                </button>
                <ul className="flex flex-col space-y-4 justify-between">
                    {sidebarRoutes.map(route => {
                        return (
                            <li key={route.id}
                                className='mt-4'
                            >
                                <Link to={route.path} className={`py-1 px-1 flex gap-2 items-center`}>
                                    <img className="widthIcon block" src={route.icon} alt={route.alt} />
                                    <span className={`text-sm ${isOpen ? 'textDarkGreen' : 'hidden'}`}>{route.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="py-12 flex flex-col space-y-4 justify-between">
                    <Link to="/config" className="py-1 px-1 flex gap-2 items-center">
                        <img src={config} className="widthIcon block" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;