import React, { useState } from "react";

import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import menuHamburguer from '../covers/icons/menu-green.png'
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";

const menuRoutes = [];


menuRoutes.push({
    id: 1,
    path: '/',
    name: 'Home'
});

// menuRoutes.push({
//     id: 2,
//     path: '/iniciar-sesion',
//     name: 'Iniciar sesión'
// });

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



export default function NavbarWeb() {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {displayName} = auth.user;
  console.log(displayName);
  
  const handleLogout = () => {
    auth.logout();
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="rounded"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-1" justify="center">
        <NavbarBrand>
          <Link href="/">
            <ReducirLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
        <Link href="/">
          <ReducirLogo />
          </Link>
        </NavbarBrand>
        {menuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
        </NavbarItem>
         ))}
        {/* <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">

      <NavbarItem>
          <Button as={Link} 
          color="warning" 
          href="#" 
          variant="flat"
          onClick={() => handleLogout()}
          >
          {displayName && <span>Logout</span>} 
          {!displayName && <span>Login</span>} 
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuRoutes.map((item) => (
          <NavbarMenuItem key={item.id}>
            <Link
              className="w-full textDarkGreen"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}