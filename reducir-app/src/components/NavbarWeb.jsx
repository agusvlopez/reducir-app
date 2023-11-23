import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const menuRoutes = [];

menuRoutes.push({     
  id: 1,    
  path: '/registrarse',
  name: 'Registrarse',
  userAuthorization: false,
  userLogged: false,

});

menuRoutes.push({     
  id: 2,    
  path: '/bienvenida',
  name: 'Rehacer test',
  userAuthorization: true, 
  userLogged: false,
});

menuRoutes.push({     
  id: 3,    
  path: '/perfil',
  name: 'Mi perfil',
  userAuthorization: true,
  userLogged: false,
});

menuRoutes.push({     
  id: 4,    
  path: '/admin/acciones',
  name: 'Administración',
  userAuthorization: true,
  userLogged: true,
});

export default function NavbarWeb() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Nuevo estado para almacenar el rol del usuario
  const displayEmail = auth?.user?.email;
  const filteredMenuRoutes = menuRoutes.filter(item => !item.userAuthorization || !!displayEmail);
  const userMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "cliente"
    return item.userLogged && (!userRole || userRole !== "usuario");
  });

  useEffect(() => {
    // Función asincrónica para obtener el campo "rol" del usuario actual
    const getUserRole = async () => {
      const userDoc = doc(db, "users", auth.user.uid);

      try {
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserRole(userSnapshot.data().rol);
        }
      } catch (error) {
        console.error("Error obteniendo el rol del usuario:", error);
      }
    };

    // Llamada a la función al cargar el componente o cuando cambie el usuario
    getUserRole();
  }, [auth.user]);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      className="backgroundNav"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/">
            <ReducirLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex " justify="center">
        <NavbarBrand>
        <Link href="/">
          <ReducirLogo />
          </Link>
        </NavbarBrand>
        
        { (displayEmail) && userMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
        </NavbarItem>     
         ))}
        { (displayEmail) &&
         <Link className="text-white" href="/perfil">
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white text-sm hover:text-white"
            > 
              App      
          </Button>
          </Link>
        }
        { (!displayEmail) && filteredMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
        </NavbarItem>
         ))}
      </NavbarContent>

      <NavbarContent justify="end">  
        <NavbarItem>
          {(displayEmail) &&
          <div>
            <Button as={Link} 
            color="warning" 
            variant="flat"
            className="text-sm backgroundOrange text-white hover:text-white"
            onClick={() => handleLogout()}
            >
            Logout
            </Button>
          </div>
          }
        </NavbarItem>   
        <NavbarItem> 
        <Link href="/iniciar-sesion">
          {(!displayEmail) &&
          <Button as={Link} 
          color="warning" 
          variant="flat"
          className="text-sm backgroundOrange text-white hover:text-white"
          >
            Login 
          </Button>
          }
          </Link>
        </NavbarItem>  
      </NavbarContent>

      <NavbarMenu>
        {(displayEmail) && userMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
          </NavbarMenuItem>
        ))}
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white text-sm "
          >
            <Link className="text-white" href="/perfil">
              App
            </Link>
          </Button>
        { (!displayEmail) && filteredMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
        </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}