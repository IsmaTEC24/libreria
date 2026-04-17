import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function MiBibliotecaPage() {
  const navigate = useNavigate();
  const { books, favorites, currentUserId, loading, error } = useAppData();

  const favoritosUsuario = useMemo(() => {
    const favoritosIds = favorites
      .filter((fav) => fav.userId === currentUserId)
      .map((fav) => fav.bookId);

    return books.filter((book) => favoritosIds.includes(book.id));
  }, [favorites, books, currentUserId]);

  if (loading) return <p>Cargando biblioteca personal...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="miBibliotecaPage">
      <div className="sectionHeader">
        <h1>Mi biblioteca</h1>
      </div>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Favoritos</h2>
        </div>

        <div className="booksGrid">
          {favoritosUsuario.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                navigate("/detalle-libro", { state: { libroId: book.id } })
              }
            >
              <BookCard
                titulo={book.title}
                autor={book.author}
                portada={book.coverUrl || "/assets/defaultBook.png"}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}