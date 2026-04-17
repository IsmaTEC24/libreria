import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../services/booksService.js";
import { useAppData } from "../context/appDataContext.jsx";

export default function AdminLibrosPage() {
  const navigate = useNavigate();
  const { books, currentUserId, loading, error, reloadAppData } = useAppData();

  const [searchTerm, setSearchTerm] = useState("");

  const librosUsuario = useMemo(() => {
    return books.filter((book) => book.userId === currentUserId);
  }, [books, currentUserId]);

  const filteredBooks = useMemo(() => {
    return librosUsuario.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [librosUsuario, searchTerm]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Deseas eliminar este libro?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      await reloadAppData();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el libro.");
    }
  }

  if (loading) return <p>Cargando administración...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="adminPage">
      <div className="adminHeader">
        <div>
          <h1>Administrar libros</h1>
          <p>Gestiona los libros asociados a tu cuenta.</p>
        </div>

        <button
          className="primaryButton"
          onClick={() => navigate("/nuevo-libro")}
        >
          + Nuevo libro
        </button>
      </div>

      <div className="adminToolbar">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          className="searchInput adminSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tableContainer">
        <table className="booksTable">
          <thead>
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Páginas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.coverUrl || "/assets/defaultBook.png"}
                    alt={book.title}
                    className="tableBookImage"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.totalPages}</td>
                <td>
                  <div className="tableActions">
                    <button
                      className="editButton"
                      onClick={() =>
                        navigate("/editar-libro", { state: { libroId: book.id } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(book.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}