import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div>
        <h1 className="navbarTitle">ReadFlow</h1>
        <p className="navbarSubtitle">Tu biblioteca digital personal</p>
      </div>

      <div className="navbarActions">
        <input
          type="text"
          placeholder="Buscar libros, autores o categorías..."
          className="searchInput"
        />

        <button
          className="themeButton"
          onClick={() => navigate("/perfil")}
        >
          👤
        </button>
      </div>
    </header>
  );
}