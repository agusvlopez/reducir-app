import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { Link as RouterLink } from "react-router-dom";

const menuRoutes = [
  { id: 1, path: "/registrarse", name: "Registrarse", userAuthorization: false, userLogged: false, adminLogged: false },
  { id: 2, path: "/bienvenida", name: "Rehacer test", userAuthorization: true, userLogged: true, adminLogged: true },
  { id: 3, path: "/perfil", name: "Mi perfil", userAuthorization: true, userLogged: true, adminLogged: true },
  { id: 4, path: "/admin/acciones", name: "Administración", userAuthorization: true, userLogged: false, adminLogged: true }
];

export default function NavbarWeb() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const displayEmail = auth?.user?.email;
  const filteredMenuRoutes = menuRoutes.filter(item => !item.userAuthorization || !!displayEmail);

  const userMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "usuario"
    return item.userLogged && (userRole || userRole !== "usuario");
  });

  const adminMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "usuario"
    return item.adminLogged && (userRole || userRole !== "admin");
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
          <RouterLink to="/">
            <ReducirLogo />
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex " justify="center">
        <NavbarBrand>
        <RouterLink to="/">
          <ReducirLogo />
          </RouterLink>
        </NavbarBrand>
        
        { (displayEmail && userRole === "usuario") && 
        userMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarItem>     
        ))}
        { (displayEmail && userRole === "admin") &&
        adminMenuRoutes.map((item) => (  
          <NavbarItem>
            <RouterLink color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarItem>
        ))}

         <RouterLink className="text-white" to="/perfil">
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white text-sm hover:text-white"
            > 
              App      
          </Button>
        </RouterLink> 
        { (!displayEmail) && filteredMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarItem>
         ))}
      </NavbarContent>

      <NavbarContent justify="end">  
        <NavbarItem>
          {(displayEmail) &&
          <div>
            <Button 
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
        <RouterLink to="/iniciar-sesion">
          {(!displayEmail) &&
          <Button 
          color="warning" 
          variant="flat"
          className="text-sm backgroundOrange text-white hover:text-white"
          >
            Login 
          </Button>
          }
          </RouterLink>
        </NavbarItem>  
      </NavbarContent>

      <NavbarMenu>
        {(displayEmail && userRole === "usuario") && 
        userMenuRoutes.map((item) => (
          <NavbarMenuItem key={item.id}>
            <RouterLink  color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
        {(displayEmail && userRole === "admin") && 
        adminMenuRoutes.map((item) => (       
          <NavbarMenuItem>
            <RouterLink  color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
        {(displayEmail) &&
          <RouterLink className="text-white w-full" to="/perfil">
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white text-sm "
          >
            App
          </Button>
          </RouterLink>
        }
        { (!displayEmail) && filteredMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}