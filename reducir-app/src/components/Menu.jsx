import React from "react";
import { Link } from "react-router-dom";
import user from '../covers/icons/user-icon.png';
import actions from '../covers/icons/actions-icon.png';
import achievements from '../covers/icons/achievements-icon.png';
import benefits from '../covers/icons/benefits-icon.png';

const navbarRoutes = [];

navbarRoutes.push({
    id: 3,
    path: '/perfil',
    name: 'Perfil',
    icon: user,
    alt: 'Mi perfil',
});

navbarRoutes.push({
    id: 6,
    path: '/acciones',
    name: 'Acciones',
    icon: actions,
});

navbarRoutes.push({
    id: 7,
    path: '/logros',
    name: 'Logros',
    icon: achievements,
});

navbarRoutes.push({
    id: 8,
    path: '/beneficios',
    name: 'Beneficios',
    icon: benefits,
});

// navbarRoutes.push({
//     id: 1,
//     path: '/',
//     name: 'Home'
// });

// navbarRoutes.push({
//     id: 2,
//     path: '/iniciar-sesion',
//     name: 'Iniciar sesión'
// });

// navbarRoutes.push({
//     id: 4,
//     path: '/registrarse',
//     name: 'Registrarse'
// });

// navbarRoutes.push({
//     id: 5,
//     path: '/welcome',
//     name: 'Bienvenida',
    
// });




export function Menu () {

    return (
        <>
        <nav className="bg-gray-100 p-4 container fixed bottom-0 w-full shadow rounded-t-lg">
       {/* TO DO : ARREGLAR EL ALT porque no aparece */}
        <ul className="flex space-x-4  justify-around">
            {navbarRoutes.map(route => {

                return (
                    <li key="{route.id}"
                    >
                        <Link to={route.path}>
                          <img src={route.icon} alt={route.alt} />
                        </Link>
                    </li>)
                }
            )}
            
        </ul>
        </nav>
        </>
    );
}


