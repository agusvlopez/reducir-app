import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home2 } from "./pages/Home2";
import { Register } from "./pages/Register"; //✅
import { Login } from "./pages/Login"; //✅
import { Welcome } from "./pages/Welcome"; //✅
import { Test } from "./pages/Test"; //✅
import { Profile } from './pages/Profile';
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
import BlogpostsForm from './components/BlogpostsForm';
import NewBlogpost from './components/NewBlogpost';
import BlogPost from './pages/blog/Blogpost';
import { Blog } from './pages/blog/Blog';
import NewAchievement from './components/NewAchievement';
import AchievementPost from './pages/Achievementpost';
import { AllAchievementsPosts } from './pages/AllAchievementsPosts';


function LayoutWithNavbar({ children }) {
  return (
    <>
      <NavbarWeb />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Navbar */}
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/bienvenida" element={<Welcome />} />
        <Route path="/test" element={<Test />} />

        {/* Rutas con Navbar */}
        <Route
          path="/*"
          element={
            <LayoutWithNavbar>
              <Routes>
                <Route path="/" element={<Home2 />} />
                <Route path="/perfil/:accountId" element={<Profile />} />
                <Route path="/acciones/:accountId" element={<Actions />} />
                <Route path="/perfil/:accountId/logros" element={<Profile />} />
                <Route path="/perfil/:accountId/blogposts" element={<Profile />} />
                <Route path="/blogpost" element={<NewBlogpost />} />
                <Route path="/logros/:accountId/new/:actionId" element={<NewAchievement />} />
                <Route path="/achievementpost/:achievementId" element={<AchievementPost />} />
                <Route path="/logros/inicio" element={<AllAchievementsPosts />} />
                <Route path="/logros/inicio/:categoria" element={<AllAchievementsPosts />} />
                <Route path="/beneficios" element={<Benefits />} />
                <Route path="/acciones/:accountId/:categoria" element={<Actions />} />
                <Route path="/accion/:actionId" element={<Action />} />
                <Route path="/blogpost/:blogpostId" element={<BlogPost />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:categoria" element={<Blog />} />
                <Route path="/admin/acciones" element={<ActionsAdmin />} />
                <Route path="/admin/acciones/new" element={<NewActionAdmin />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </LayoutWithNavbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
