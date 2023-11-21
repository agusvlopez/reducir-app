import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

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

menuRoutes.push({     
  id: 6,    
  path: '/admin',
  name: 'Administración',
  userAuthorization: true,
  userLogged: true,
});

export default function NavbarWeb() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayEmail = auth?.user?.email;
  console.log(displayEmail);
  const filteredMenuRoutes = menuRoutes.filter(item => !item.userAuthorization || !!displayEmail);
  const userMenuRoutes = menuRoutes.filter(item => item.userLogged === true);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  }

   // Si el usuario no está autenticado y trata de acceder a una ruta autorizada, redirige al inicio ("/")


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
        { (displayEmail) &&
         <Link className="text-white" href="/perfil">
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white mr-2 text-sm hover:text-white"
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
            className="text-sm"
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
          className="text-sm"
          >
            Login 
          </Button>
          }
          </Link>
        </NavbarItem>  
      </NavbarContent>

      <NavbarMenu>
        { (displayEmail) && userMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <Link color="foreground" to={item.path}>
           {item.name}
          </Link>
          </NavbarMenuItem>
         ))}
          <Button 
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white mr-2 text-sm "
          >
            <Link className="text-white" href="/perfil">
              App
            </Link>
          </Button>
        { (!displayEmail) && filteredMenuRoutes.map((item) => (
        <NavbarMenuItem key={item.id}>
          <Link color="foreground" to={item.path}>
           {item.name}
          </Link>
        </NavbarMenuItem>
         ))}
      </NavbarMenu>
    </Navbar>
  );
}