import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function BibliotecaPage() {
  const navigate = useNavigate();
  const { books, categories, currentUserId, loading, error } = useAppData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const librosUsuario = useMemo(() => {
    return books.filter((book) => book.userId === currentUserId);
  }, [books, currentUserId]);

  const filteredBooks = useMemo(() => {
    return librosUsuario.filter((book) => {
      const searchMatch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategory === "all" || book.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [librosUsuario, searchTerm, selectedCategory]);

  if (loading) return <p>Cargando biblioteca...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bibliotecaPage">
      <div className="sectionHeader">
        <h1>Biblioteca</h1>
        <p>Explora todos tus libros.</p>
      </div>

      <div className="adminToolbar">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          className="searchInput adminSearch"
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

      <div className="booksGrid">
        {filteredBooks.map((book) => (
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
  );
}