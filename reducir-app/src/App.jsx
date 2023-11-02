import './index.css';
import React from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Welcome } from "./components/Welcome";
import { Profile } from './components/Profile';
import { Actions } from './components/Actions';
import { Achievements } from './components/Achievements';
import { Benefits } from './components/Benefits';
import { Action } from './components/Action';

const routes = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<Home />} />
  <Route path="/iniciar-sesion" element={<Login />}/>
  <Route path="/registrarse" element={<Register />}/>
  <Route path="/bienvenida" element={<Welcome />}/>
  <Route path="/perfil" element={<Profile />}/>
  <Route path="/acciones" element={<Actions />}/>
  <Route path="/logros" element={<Achievements />}/>
  <Route path="/beneficios" element={<Benefits />}/>
  <Route path="/accion/:idAccion" element={<Action />}/>
  </>
))


function App() {
 
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App