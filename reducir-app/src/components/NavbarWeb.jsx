import React, { useState } from "react";
import { Link } from "react-router-dom";
import menuHamburguer from '../covers/icons/menu-green.png'
import logoNav from '../covers/nombre-large.png';

const menuRoutes = [];


menuRoutes.push({
    id: 1,
    path: '/',
    name: 'Home'
});

menuRoutes.push({
    id: 2,
    path: '/iniciar-sesion',
    name: 'Iniciar sesión'
});

menuRoutes.push({     
    id: 3,    
    path: '/registrarse',
    name: 'Registrarse' 
});

// menuRoutes.push({
//     id: 4,
//     path: '/welcome',
//     name: 'Bienvenida',
    
// });




export function NavbarWeb () {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
      setOpen(!open);
    };
    return (
        <>
        <nav className="bg-gray-100 p-4 container mb-4 w-full shadow rounded-t-lg">
       {/* TO DO : ARREGLAR EL ALT porque no aparece */}
       <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold"><img className='navLogo' src={logoNav}></img></div>

        <div className="md:hidden">
          <a
            onClick={toggleMenu}
            className="focus:outline-none"
          >
           <img className='menuHamburguer' src={open ? menuHamburguer : menuHamburguer} /> 
          </a>
        </div>
        </div>
        <div className={`md:flex ${open ? 'block' : 'hidden'}`}>
         
        <ul className="md:flex text-end mt-2 content-end textDarkGreen">
            {menuRoutes.map(route => {

                return (
                    <li key={route.id}
                    >
                        <Link to={route.path}
                        className="textDarkGreen p-2 border-b-2 block">
                         {route.name}
                        </Link>
                    </li>)
                }
            )}
            
        </ul>
        </div>
        </nav>
        </>
    );
}


