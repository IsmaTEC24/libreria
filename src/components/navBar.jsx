import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div>
        <h1 className="navbarTitle">ReadFlow</h1>
        <p className="navbarSubtitle">
          {isAuthenticated
            ? `Bienvenido, ${currentUser.name}`
            : "Tu biblioteca digital personal"}
        </p>
      </div>

      <div className="navbarActions">
        <input
          type="text"
          placeholder="Buscar libros, autores o categorías..."
          className="searchInput"
        />

        {isAuthenticated ? (
          <>
            <button className="themeButton" onClick={() => navigate("/perfil")}>
              👤
            </button>
            <button className="secondaryButton" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <button className="primaryButton" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}