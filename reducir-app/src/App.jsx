import './index.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Welcome } from "./components/Welcome";
import { Test } from "./components/Test";
import { Profile } from './components/Profile';
import { Actions } from './components/Actions';
import { Achievements } from './components/Achievements';
import { Benefits } from './components/Benefits';
import { Action } from './components/Action';
import { AuthProvider } from './context/authContext';
// import Admin from './pages/backOffice/Admin';
import NewActionAdmin from './pages/backOffice/NewActionAdmin';
import ActionsAdmin from './pages/backOffice/ActionsAdmin';
import AuthRoute from './components/AuthRoute';
import AuthAdminRoute from './components/AuthAdminRoute';
import NavbarWeb from './components/NavbarWeb';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarWeb />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />}/>
        <Route path="/registrarse" element={<Register />}/>
        <Route path="/bienvenida" element={<AuthRoute><Welcome /></AuthRoute>}/>
        <Route path="/test" element={<AuthRoute><Test /></AuthRoute>}/>
        <Route path="/perfil" element={<AuthRoute><Profile /></AuthRoute>}/>
        <Route path="/acciones" element={<AuthRoute><Actions /></AuthRoute>}/>
        <Route path="/logros" element={<AuthRoute><Achievements /></AuthRoute>}/>
        <Route path="/beneficios" element={<AuthRoute><Benefits /></AuthRoute>}/>
        <Route path="/acciones/:categoria" element={<AuthRoute><Actions /></AuthRoute>}/>
        <Route path="/accion/:idAccion" element={<AuthRoute><Action /></AuthRoute>}/>
        {/* <Route path="/admin" element={<AuthAdminRoute><Admin /></AuthAdminRoute>}/> */}
        <Route path="/admin/acciones" element={<AuthAdminRoute><ActionsAdmin /></AuthAdminRoute>}/> 
        <Route path="/admin/acciones/new" element={<AuthAdminRoute><NewActionAdmin /></AuthAdminRoute>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
