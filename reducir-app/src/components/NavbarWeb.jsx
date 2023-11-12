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
  userLogged: true,
});

menuRoutes.push({     
  id: 2,    
  path: '/registrarse',
  name: 'Registrarse',
  userAuthorization: false,
  userLogged: false,

});

menuRoutes.push({
  id: 3,
  path: '/config',
  name: 'Configuración',
  userAuthorization: true,
  userLogged: true,
});


menuRoutes.push({     
  id: 4,    
  path: '/bienvenida',
  name: 'Rehacer test',
  userAuthorization: true, 
  userLogged: true,
});

menuRoutes.push({     
  id: 5,    
  path: '/perfil',
  name: 'Mi perfil',
  userAuthorization: true,
  userLogged: false,
});

export default function NavbarWeb() {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayEmail = auth?.user?.email;
  console.log(displayEmail);
  const filteredMenuRoutes = menuRoutes.filter(item => item.userAuthorization === false);
  const userMenuRoutes = menuRoutes.filter(item => item.userLogged === true);

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
        
        { (displayEmail) && userMenuRoutes.map((item) => (
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
          <div>
            <Button as={Link} 
            href="/perfil" 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white mr-2 text-sm hover:text-white"
            >
            App
            </Button>
            <Button as={Link} 
            color="warning" 
            href="#" 
            variant="flat"
            className="text-sm"
            onClick={() => handleLogout()}
            >
            Logout
            </Button>
          </div>
          }
        </NavbarItem>
    
       
        <NavbarItem> 
          {(!displayEmail) &&
          <Button as={Link} 
          color="warning" 
          href="/iniciar-sesion" 
          variant="flat"
          className="text-sm"
          >
          Login
          </Button>
          }
        </NavbarItem>
    
      </NavbarContent>

      <NavbarMenu>
        { (displayEmail) && userMenuRoutes.map((item) => (
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