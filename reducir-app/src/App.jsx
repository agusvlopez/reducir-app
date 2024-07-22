import './index.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Welcome } from "./components/Welcome";
import { Test } from "./pages/Test";
import { Profile } from './components/Profile';
import { Actions } from './components/Actions';
import { Achievements } from './pages/Achievements';
import { Benefits } from './components/Benefits';
import { Action } from './components/Action';
import { AuthProvider } from './context/authContext';
// import Admin from './pages/backOffice/Admin';
import NewActionAdmin from './pages/backOffice/NewActionAdmin';
import ActionsAdmin from './pages/backOffice/ActionsAdmin';
import AuthRoute from './components/AuthRoute';
import AuthAdminRoute from './components/AuthAdminRoute';
import NavbarWeb from './components/NavbarWeb';
import PageNotFound from './pages/PageNotFound';
import { AchievementsForm } from './pages/AchievementsForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarWeb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/bienvenida" element={<Welcome />} />
          <Route path="/test" element={<Test />} />
          <Route path="/perfil/:accountId" element={<Profile />} />
          <Route path="/acciones/:accountId" element={<Actions />} />
          <Route path="/logros/:accountId" element={<Achievements />} />
          <Route path="/logros/:accountId/nuevo/:achievementId" element={<AchievementsForm />} />
          <Route path="/beneficios" element={<Benefits />} />
          <Route path="/acciones/:accountId/:categoria" element={<Actions />} />
          <Route path="/accion/:actionId" element={<Action />} />
          {/* <Route path="/admin" element={<AuthAdminRoute><Admin /></AuthAdminRoute>}/> */}
          <Route path="/admin/acciones" element={<ActionsAdmin />} />
          <Route path="/admin/acciones/new" element={<NewActionAdmin />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
