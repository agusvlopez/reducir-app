import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useGetUserQuery } from "../features/fetchFirebase";

const menuRoutes = [
  { id: 1, path: "/registrarse", name: "Registrarse", userAuthorization: false, userLogged: false, adminLogged: false },
  { id: 2, path: "/bienvenida", name: "Rehacer test", userAuthorization: true, userLogged: true, adminLogged: true },
  { id: 3, path: "/perfil", name: "Mi perfil", userAuthorization: true, userLogged: true, adminLogged: true },
  { id: 4, path: "/admin/acciones", name: "Administración", userAuthorization: true, userLogged: false, adminLogged: true }
];

const NavbarWeb = (() => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uid = auth ? auth?.user?.uid : null;

  const { data: userData, isLoading: userLoading, isError: userError } = useGetUserQuery(uid);
  
  const role = userData?.user?.rol;
 
  const displayEmail = auth?.user?.email;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  const filteredMenuRoutes = menuRoutes.filter(item => !item.userAuthorization || !!displayEmail);

  const userMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "usuario"
    return item.userLogged && (role || role !== "usuario");
  });

  const adminMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "usuario"
    return item.adminLogged && (role || role !== "admin");
  });

  const handleLogin = () => {
    navigate("/iniciar-sesion");
  }
  const handleLogout = () => {
    localStorage.removeItem('user');
    auth.logout();
   
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
        
        { (storedUser && role === "usuario") && 
        userMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarItem>     
        ))}
        { (storedUser && role === "admin") &&
        adminMenuRoutes.map((item) => (  
          <NavbarItem>
            <RouterLink color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarItem>
        ))}
        {(storedUser) &&
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
        }
        { (!storedUser) && filteredMenuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarItem>
         ))}
      </NavbarContent>

      <NavbarContent justify="end">  
        <NavbarItem>
          {(storedUser) &&
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
          {(!storedUser) &&
          <Button 
          onPress={handleLogin}
          type="button"
          variant="flat"
          className="text-sm backgroundOrange text-white hover:text-white"
          >
            Login 
          </Button>
          }
        </NavbarItem>  
      </NavbarContent>

      <NavbarMenu>
        {(storedUser && role === "usuario") && 
        userMenuRoutes.map((item) => (
          <NavbarMenuItem key={item.id}>
            <RouterLink  color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
        {(storedUser && role === "admin") && 
        adminMenuRoutes.map((item) => (       
          <NavbarMenuItem>
            <RouterLink  color="foreground" to={item.path}>
            {item.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
        {(storedUser) &&
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
        { (!storedUser) && filteredMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <RouterLink  color="foreground" to={item.path}>
           {item.name}
          </RouterLink>
        </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
})

export default NavbarWeb;