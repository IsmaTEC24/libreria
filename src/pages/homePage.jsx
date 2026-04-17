import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { books, categories, readingProgress, loading, error } = useAppData();

  const librosUsuario = useMemo(() => {
    return books.filter((book) => book.userId === currentUser?.id);
  }, [books, currentUser]);

  const continuarLeyendo = useMemo(() => {
    return readingProgress
      .filter((item) => item.userId === currentUser?.id)
      .map((progressItem) => {
        const book = books.find((item) => item.id === progressItem.bookId);
        if (!book) return null;

        return {
          ...book,
          progress: progressItem.percentage,
          currentPage: progressItem.currentPage,
        };
      })
      .filter(Boolean);
  }, [readingProgress, books, currentUser]);

  const recomendados = librosUsuario.slice(0, 4);

  if (!currentUser) return <p>Debes iniciar sesión.</p>;
  if (loading) return <p>Cargando inicio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="homePage">
      <section className="heroSection">
        <div className="heroContent">
          <span className="heroBadge">Biblioteca digital</span>
          <h1 className="heroTitle">
            Lee, organiza y continúa tus libros desde un solo lugar
          </h1>
          <p className="heroText">
            Explora tu colección, retoma tus lecturas y administra tus libros de forma simple.
          </p>

          <div className="heroButtons">
            <button
              className="primaryButton"
              onClick={() => navigate("/biblioteca")}
            >
              Explorar biblioteca
            </button>

            <button
              className="secondaryButton"
              onClick={() => navigate("/mi-biblioteca")}
            >
              Mi biblioteca
            </button>
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Continuar leyendo</h2>
        </div>

        <div className="booksGrid">
          {continuarLeyendo.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                navigate("/lectura", { state: { libroId: book.id } })
              }
            >
              <BookCard
                titulo={book.title}
                autor={book.author}
                portada={book.coverUrl || "/assets/defaultBook.png"}
                progreso={book.progress}
                mostrarProgreso={true}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Categorías</h2>
        </div>

        <div className="categoryContainer">
          {categories.map((category) => (
            <button key={category.id} className="categoryChip">
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Tus libros</h2>
        </div>

        <div className="booksGrid">
          {recomendados.map((book) => (
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