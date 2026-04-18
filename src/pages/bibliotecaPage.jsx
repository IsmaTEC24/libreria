import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function BibliotecaPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { books, categories, loading, error } = useAppData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const userBooks = useMemo(() => {
    if (!currentUser) return [];
    return books.filter((book) => book.userId === currentUser.id);
  }, [books, currentUser]);

  const filteredBooks = useMemo(() => {
    return userBooks.filter((book) => {
      const matchesSearch =
        (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [userBooks, searchTerm, selectedCategory]);

  if (!currentUser) {
    return (
      <section className="bibliotecaPage">
        <div className="sectionHeader">
          <h1>Biblioteca</h1>
          <p>Debes iniciar sesión.</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bibliotecaPage">
        <div className="sectionHeader">
          <h1>Biblioteca</h1>
          <p>Cargando libros...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bibliotecaPage">
        <div className="sectionHeader">
          <h1>Biblioteca</h1>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bibliotecaPage">
      <div className="sectionHeader">
        <h1>Biblioteca</h1>
        <p>Explora los libros asociados a tu cuenta.</p>
      </div>

      <div className="adminToolbar">
        <input
          type="text"
          className="searchInput adminSearch"
          placeholder="Buscar por título o autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="adminSelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="emptyState">
          <p>No hay libros para mostrar.</p>
        </div>
      ) : (
        <div className="booksGrid">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                navigate("/detalle-libro", {
                  state: { libroId: book.id },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <BookCard
                titulo={book.title}
                autor={book.author}
                portada={book.coverUrl || "/assets/defaultBook.png"}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}