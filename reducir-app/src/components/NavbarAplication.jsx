import React, { useState } from 'react';
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import menuHamburguer from '../covers/icons/menu-green.png'
import ReducirLogo from './ReducirLogo';

const menuRoutes = [];


menuRoutes.push({
    id: 1,
    path: '/config',
    name: 'Configuración de la cuenta'
});

menuRoutes.push({
    id: 2,
    path: '/compartir',
    name: 'Compartir'
});

menuRoutes.push({     
    id: 3,    
    path: '/bienvenida',
    name: 'Rehacer test' 
});

function NavbarAplication() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
     <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
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
      </NavbarContent>

      <NavbarContent justify="end">

        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
           Logout
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
    <section>
    </section>
    </>
  );
}

export default NavbarAplication;