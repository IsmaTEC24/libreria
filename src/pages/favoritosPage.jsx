import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useAppData } from "../context/appDataContext.jsx";
import BookCard from "../components/bookCard.jsx";

export default function FavoritosPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { books, loading, error } = useAppData();

  function getFavoriteKey() {
    return `favorites-${currentUser?.id}`;
  }

  function getFavorites() {
    const saved = localStorage.getItem(getFavoriteKey());
    return saved ? JSON.parse(saved) : [];
  }

  const [favoritosIds, setFavoritosIds] = useState(getFavorites());

  const favoritos = useMemo(() => {
    return books.filter((book) => favoritosIds.includes(book.id));
  }, [books, favoritosIds]);

  function quitarFavorito(bookId) {
    const nuevos = favoritosIds.filter((id) => id !== bookId);
    setFavoritosIds(nuevos);
    localStorage.setItem(getFavoriteKey(), JSON.stringify(nuevos));
  }

  if (loading) return <p>Cargando favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="sectionBlock">
      <div className="sectionHeader">
        <h1>Favoritos</h1>
      </div>

      {favoritos.length === 0 ? (
        <p>No tienes libros en favoritos.</p>
      ) : (
        <div className="booksGrid">
          {favoritos.map((book) => (
            <div key={book.id} className="favoriteCardWrapper">
              <div
                onClick={() =>
                  navigate("/detalle-libro", { state: { libroId: book.id } })
                }
                style={{ cursor: "pointer" }}
              >
                <BookCard
                  titulo={book.title}
                  autor={book.author}
                  portada={book.coverUrl || "/assets/defaultBook.png"}
                />
              </div>

              <button
                className="dangerButton"
                onClick={() => quitarFavorito(book.id)}
              >
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}