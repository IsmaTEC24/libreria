export default function Navbar() {
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

        <button className="themeButton">🌙</button>
      </div>
    </header>
  );
}