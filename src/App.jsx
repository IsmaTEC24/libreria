import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import BibliotecaPage from "./pages/BibliotecaPage.jsx";
import FavoritosPage from "./pages/FavoritosPage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import DetalleLibroPage from "./pages/DetalleLibroPage.jsx";
import LecturaPage from "./pages/LecturaPage.jsx";

import { useAuth } from "./context/authContext.jsx";

export default function App() {

  const { isAuthenticated } = useAuth();

  return (
    <div className="appShell">

      {/* navbar solo si hay usuario logueado */}
      {isAuthenticated && <Navbar />}

      <main className="mainContent">

        <Routes>

          {/* ruta inicial */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to="/home" />
                : <Navigate to="/login" />
            }
          />

          {/* login */}
          <Route path="/login" element={<LoginPage />} />

          {/* home */}
          <Route
            path="/home"
            element={
              isAuthenticated
                ? <HomePage />
                : <Navigate to="/login" />
            }
          />

          {/* biblioteca */}
          <Route
            path="/biblioteca"
            element={
              isAuthenticated
                ? <BibliotecaPage />
                : <Navigate to="/login" />
            }
          />

          {/* favoritos */}
          <Route
            path="/favoritos"
            element={
              isAuthenticated
                ? <FavoritosPage />
                : <Navigate to="/login" />
            }
          />

          {/* perfil usuario */}
          <Route
            path="/perfil"
            element={
              isAuthenticated
                ? <PerfilPage />
                : <Navigate to="/login" />
            }
          />

          {/* detalle libro */}
          <Route
            path="/detalle-libro"
            element={
              isAuthenticated
                ? <DetalleLibroPage />
                : <Navigate to="/login" />
            }
          />

          {/* lector pdf */}
          <Route
            path="/lectura"
            element={
              isAuthenticated
                ? <LecturaPage />
                : <Navigate to="/login" />
            }
          />

        </Routes>

      </main>

    </div>
  );
}