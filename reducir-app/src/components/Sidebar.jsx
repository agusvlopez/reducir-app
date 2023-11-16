import React, { useState } from 'react';
import { Link } from "react-router-dom";
import user from '../covers/icons/user-icon.png';
import actions from '../covers/icons/actions-icon.png';
import achievements from '../covers/icons/achievements-icon.png';
import benefits from '../covers/icons/benefits-icon.png';
import exit from '../covers/icons/exit.png';
import more from '../covers/icons/more-vertical.png';

const sidebarRoutes = [];

sidebarRoutes.push({
    id: 3,
    path: '/perfil',
    name: 'Perfil',
    icon: user,
    alt: 'Mi perfil',
});

sidebarRoutes.push({
    id: 6,
    path: '/acciones',
    name: 'Acciones',
    icon: actions,
});

sidebarRoutes.push({
    id: 7,
    path: '/logros',
    name: 'Logros',
    icon: achievements,
});

sidebarRoutes.push({
    id: 8,
    path: '/beneficios',
    name: 'Beneficios',
    icon: benefits,
});

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true); // Estado para controlar si la barra está abierta

    const toggleBar = () => {
      setIsOpen(!isOpen); // Cambia el estado para abrir o cerrar la barra
    };

  return (
    <div className="border-r w-fit p-4 container">
    <div className={`h-screen ${isOpen ? 'w-36' : 'w-fit'} p-4 transition-all duration-300 ease-in-out`}>
      <button onClick={toggleBar} className="py-1 px-1 sidebarButton">
       <span className={`${isOpen ? 'exitIcon' : 'moreIcon'} transition-all duration-300 ease-in-out `}></span> 
      </button>
      <ul className="flex flex-col space-y-4">
            {sidebarRoutes.map(route => {

                return (
                    <li key={route.id}
                    className='mt-4'
                    >
                        <Link to={route.path} className={`py-1 px-1 flex gap-2 items-center`}>  
                          <img className="widthIcon block" src={route.icon} alt={route.alt} />  
                         <span className={`text-sm ${isOpen ? 'textDarkGreen' : 'hidden'}`}>{route.name}</span>  
                        </Link>
                    </li>)
                }
            )}
            
        </ul>
    </div>
     

  </div>
  );
};

export default Sidebar;