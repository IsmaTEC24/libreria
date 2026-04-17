import { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook } from "../services/booksService";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newBook, setNewBook] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    descripcion: "",
    estado: "Publicado",
    paginas: "",
    idioma: "Español",
    portada: "",
    pdfUrl: ""
  });

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los libros.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!newBook.titulo || !newBook.autor) {
      alert("Título y autor son obligatorios");
      return;
    }

    try {
      await createBook(newBook);

      const localBook = {
        id: Date.now(),
        ...newBook,
        paginas: Number(newBook.paginas) || 0
      };

      setBooks((prev) => [...prev, localBook]);

      setNewBook({
        titulo: "",
        autor: "",
        categoria: "",
        descripcion: "",
        estado: "Publicado",
        paginas: "",
        idioma: "Español",
        portada: "",
        pdfUrl: ""
      });

      setShowForm(false);
      alert("Libro creado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al crear el libro");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Deseas eliminar este libro?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      alert("Libro eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el libro");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#222", margin: 0 }}>Biblioteca</h1>

        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 16px",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Agregar libro
        </button>
      </div>

      {showForm && (
        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "30px"
          }}
        >
          <h2 style={{ marginTop: 0 }}>Crear libro</h2>

          <form onSubmit={handleCreate} style={{ display: "grid", gap: "10px" }}>
            <input name="titulo" placeholder="Título" value={newBook.titulo} onChange={handleChange} />
            <input name="autor" placeholder="Autor" value={newBook.autor} onChange={handleChange} />
            <input name="categoria" placeholder="Categoría" value={newBook.categoria} onChange={handleChange} />
            <textarea name="descripcion" placeholder="Descripción" value={newBook.descripcion} onChange={handleChange} />
            <input name="estado" placeholder="Estado" value={newBook.estado} onChange={handleChange} />
            <input name="paginas" placeholder="Páginas" value={newBook.paginas} onChange={handleChange} />
            <input name="idioma" placeholder="Idioma" value={newBook.idioma} onChange={handleChange} />
            <input name="portada" placeholder="URL portada" value={newBook.portada} onChange={handleChange} />
            <input name="pdfUrl" placeholder="URL PDF" value={newBook.pdfUrl} onChange={handleChange} />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Guardar libro
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#ccc",
                  color: "#222",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {loading && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          Cargando libros...
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            color: "#b00020",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          No hay libros para mostrar.
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px"
          }}
        >
          {books.map((book) => (
            <article
              key={book.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  backgroundColor: "#e9e9e9",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {book.portada ? (
                  <img
                    src={book.portada}
                    alt={book.titulo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <span>Sin portada</span>
                )}
              </div>

              <h2 style={{ margin: "0 0 8px 0", color: "#222" }}>
                {book.titulo || "Sin título"}
              </h2>

              <p style={{ margin: "4px 0", color: "#444" }}>
                <strong>Autor:</strong> {book.autor || "No disponible"}
              </p>

              <p style={{ margin: "4px 0", color: "#444" }}>
                <strong>Categoría:</strong> {book.categoria || "No disponible"}
              </p>

              <p style={{ margin: "4px 0", color: "#444" }}>
                <strong>Estado:</strong> {book.estado || "No disponible"}
              </p>

              <p style={{ margin: "4px 0", color: "#444" }}>
                <strong>Páginas:</strong> {book.paginas || "No disponible"}
              </p>

              <p style={{ margin: "4px 0", color: "#444" }}>
                <strong>Idioma:</strong> {book.idioma || "No disponible"}
              </p>

              <p style={{ marginTop: "10px", color: "#555" }}>
                {book.descripcion || "Sin descripción."}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                {book.pdfUrl && (
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      backgroundColor: "#222",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "10px"
                    }}
                  >
                    Ver PDF
                  </a>
                )}

                <button
                  onClick={() => handleDelete(book.id)}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#b00020",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}