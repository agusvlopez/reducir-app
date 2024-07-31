import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import ReducirLogo from './ReducirLogo';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useGetUserQuery, useLogoutSessionMutation } from "../features/fetchFirebase";


const NavbarWeb = (() => {
  const accountId = localStorage.getItem('_id');
  const menuRoutes = [
    { id: 1, path: "/registrarse", name: "Registrarse", userAuthorization: false, userLogged: false, adminLogged: false },
    { id: 2, path: "/bienvenida", name: "Rehacer test", userAuthorization: true, userLogged: true, adminLogged: true },
    { id: 3, path: `/perfil/${accountId}`, name: "Mi perfil", userAuthorization: true, userLogged: true, adminLogged: true },
    { id: 4, path: "/admin/acciones", name: "Administración", userAuthorization: true, userLogged: false, adminLogged: true }
  ];

  const navigate = useNavigate();
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uid = auth ? auth?.user?.uid : null;
  const { data: userData, isLoading: userLoading, isError: userError } = useGetUserQuery(uid);
  const role = localStorage.getItem('role');
  const displayEmail = auth?.user?.email;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const filteredMenuRoutes = menuRoutes.filter(item => !item.userAuthorization && !role);
  console.log("filteredMenuRoutes", filteredMenuRoutes);
  const userMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "cliente"
    return item.userLogged && (role || role !== "cliente");
  });
  console.log("userMenuRoutes", userMenuRoutes);
  const adminMenuRoutes = menuRoutes.filter((item) => {
    // Filtra las rutas de administración si el usuario tiene el rol "admin"
    return item.adminLogged && (role || role == "admin");
  });
  console.log("adminMenuRoutes", adminMenuRoutes);
  const [logoutSession] = useLogoutSessionMutation();

  const handleApp = () => {
    navigate(`/perfil/${accountId}`);
  }
  const handleLogin = () => {
    navigate("/iniciar-sesion");
  }
  const handleLogout = async () => {
    await logoutSession().unwrap();
    localStorage.removeItem('_id');
    localStorage.removeItem('achievements');
    localStorage.removeItem('carbon');
    localStorage.removeItem('email');
    localStorage.removeItem('favorites');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    //auth.logout();
    navigate("/iniciar-sesion");
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

        {(role === "cliente") &&
          userMenuRoutes.map((item) => (
            <NavbarItem key={item.id}>
              <RouterLink color="foreground" to={item.path}>
                {item.name}
              </RouterLink>
            </NavbarItem>
          ))}
        {(role === "admin") &&
          adminMenuRoutes.map((item) => (
            <NavbarItem>
              <RouterLink color="foreground" to={item.path}>
                {item.name}
              </RouterLink>
            </NavbarItem>
          ))}
        {(role) &&
          <Button
            onPress={handleApp}
            variant="flat"
            radius="full"
            size="sm"
            className="backgroundDarkGreen text-white text-sm hover:text-white"
          >
            App
          </Button>
        }
        {(!storedUser) && filteredMenuRoutes.map((item) => (
          <NavbarItem key={item.id}>
            <RouterLink color="foreground" to={item.path}>
              {item.name}
            </RouterLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {(role) &&
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
          {(!role) &&
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
        {(role === "cliente") &&
          userMenuRoutes.map((item) => (
            <NavbarMenuItem key={item.id}>
              <RouterLink color="foreground" to={item.path}>
                {item.name}
              </RouterLink>
            </NavbarMenuItem>
          ))}
        {(role === "admin") &&
          adminMenuRoutes.map((item) => (
            <NavbarMenuItem>
              <RouterLink color="foreground" to={item.path}>
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
        {(!storedUser) && filteredMenuRoutes.map((item) => (
          <NavbarMenuItem key={item.id}>
            <RouterLink color="foreground" to={item.path}>
              {item.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
})

export default NavbarWeb;