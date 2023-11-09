import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";

const menuRoutes = [];

menuRoutes.push({
  id: 1,
  path: '/',
  name: 'Home',
  userAuthorization: false,
});

menuRoutes.push({     
  id: 2,    
  path: '/registrarse',
  name: 'Registrarse',
  userAuthorization: false,
});

menuRoutes.push({
  id: 3,
  path: '/config',
  name: 'Configuración de la cuenta',
  userAuthorization: true,
});

menuRoutes.push({
  id: 4,
  path: '/compartir',
  name: 'Compartir',
  userAuthorization: true,
});

menuRoutes.push({     
  id: 5,    
  path: '/bienvenida',
  name: 'Rehacer test',
  userAuthorization: true, 
});

menuRoutes.push({     
  id: 6,    
  path: '/perfil',
  name: 'Mi perfil',
  userAuthorization: true,
});

export default function NavbarWeb() {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {displayName} = auth.user;
  
  const displayEmail = auth?.user?.email;
  console.log(displayName);
  console.log(displayEmail);
  const filteredMenuRoutes = menuRoutes.filter(item => item.userAuthorization === false);

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
        
        { (displayEmail) && menuRoutes.map((item) => (
        <NavbarItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
        </NavbarItem>
         ))}
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
          <Button as={Link} 
          color="warning" 
          href="#" 
          variant="flat"
          onClick={() => handleLogout()}
          >
          Logout
          </Button>
          }
        </NavbarItem>
    
       
        <NavbarItem> 
          {(!displayEmail) &&
          <Button as={Link} 
          color="warning" 
          href="/iniciar-sesion" 
          variant="flat"
          >
          Login
          </Button>
          }
        </NavbarItem>
    
      </NavbarContent>

      <NavbarMenu>
        { (displayEmail) && menuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <Link color="foreground" href={item.path}>
           {item.name}
          </Link>
          </NavbarMenuItem>
         ))}
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