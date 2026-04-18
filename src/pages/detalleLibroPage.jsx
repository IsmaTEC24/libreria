import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppData } from "../context/appDataContext.jsx";
import { useAuth } from "../context/authContext.jsx";

export default function DetalleLibroPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { books, loading, error } = useAppData();

  const libroId = location.state?.libroId;

  const book = useMemo(() => {
    return books.find((item) => String(item.id) === String(libroId)) || null;
  }, [books, libroId]);

  function getFavoriteKey() {
    return `favorites-${currentUser?.id}`;
  }

  function getFavorites() {
    const saved = localStorage.getItem(getFavoriteKey());
    return saved ? JSON.parse(saved) : [];
  }

  const [favoritos, setFavoritos] = useState(getFavorites());

  const esFavorito = book ? favoritos.includes(book.id) : false;

  function toggleFavorito() {
    if (!book) return;

    let nuevosFavoritos;

    if (esFavorito) {
      nuevosFavoritos = favoritos.filter((id) => id !== book.id);
    } else {
      nuevosFavoritos = [...favoritos, book.id];
    }

    setFavoritos(nuevosFavoritos);
    localStorage.setItem(getFavoriteKey(), JSON.stringify(nuevosFavoritos));
  }

  if (loading) return <p>Cargando libro...</p>;
  if (error) return <p>{error}</p>;
  if (!libroId) return <p>No se recibió el libro seleccionado.</p>;
  if (!book) return <p>Libro no encontrado.</p>;

  return (
    <section className="detalleLibroPage">
      <div className="detalleLibroCard">
        <img
          src={book.coverUrl || "/assets/defaultBook.png"}
          alt={book.title}
          className="detalleLibroImage"
        />

        <div className="detalleLibroContent">
          <span className="heroBadge">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="detalleAutor">{book.author}</p>
          <p className="detalleDescripcion">{book.description}</p>

          <div className="detalleMeta">
            <div className="metaItem">
              <strong>Idioma</strong>
              <span>{book.language || "N/A"}</span>
            </div>

            <div className="metaItem">
              <strong>Páginas</strong>
              <span>{book.totalPages || "N/A"}</span>
            </div>

            <div className="metaItem">
              <strong>Estado</strong>
              <span>{book.currentStatus || "Activo"}</span>
            </div>
          </div>

          <div className="detalleActions">
            <button
              className="secondaryButton"
              onClick={() => navigate("/biblioteca")}
            >
              Volver
            </button>

            <button
              className="primaryButton"
              onClick={() =>
                navigate("/lectura", { state: { libroId: book.id } })
              }
            >
              Seguir leyendo
            </button>

            <button className="secondaryButton" onClick={toggleFavorito}>
              {esFavorito ? "★ Quitar favorito" : "☆ Agregar a favoritos"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}