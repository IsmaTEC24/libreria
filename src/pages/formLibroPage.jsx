import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBook,
  getBookById,
  updateBook,
} from "../services/booksService.js";
import { useAppData } from "../context/appDataContext.jsx";

export default function FormLibroPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, currentUserId, reloadAppData } = useAppData();

  const libroId = location.state?.libroId;
  const modoEdicion = Boolean(libroId);

  const [formData, setFormData] = useState({
    userId: currentUserId,
    title: "",
    author: "",
    category: "",
    description: "",
    language: "es",
    coverUrl: "",
    pdfUrl: "",
    pdfFileName: "",
    pdfFileSize: 0,
    totalPages: 0,
    currentStatus: "activo",
    isPublic: true,
  });

  const [loading, setLoading] = useState(modoEdicion);

  useEffect(() => {
    async function loadBook() {
      if (!modoEdicion) return;

      try {
        const data = await getBookById(libroId);
        setFormData({
          userId: data.userId,
          title: data.title || "",
          author: data.author || "",
          category: data.category || "",
          description: data.description || "",
          language: data.language || "es",
          coverUrl: data.coverUrl || "",
          pdfUrl: data.pdfUrl || "",
          pdfFileName: data.pdfFileName || "",
          pdfFileSize: data.pdfFileSize || 0,
          totalPages: data.totalPages || 0,
          currentStatus: data.currentStatus || "activo",
          isPublic: data.isPublic ?? true,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [libroId, modoEdicion]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (modoEdicion) {
        await updateBook(libroId, formData);
      } else {
        await createBook(formData);
      }

      await reloadAppData();
      navigate("/admin-libros");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el libro.");
    }
  }

  if (loading) return <p>Cargando formulario...</p>;

  return (
    <section className="formPage">
      <div className="formContainer">
        <div className="formHeader">
          <h1>{modoEdicion ? "Editar libro" : "Nuevo libro"}</h1>
        </div>

        <form className="formGrid" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Título</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Autor</label>
            <input name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Categoría</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Idioma</label>
            <input name="language" value={formData.language} onChange={handleChange} />
          </div>

          <div className="formGroup fullWidth">
            <label>Descripción</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>URL portada</label>
            <input name="coverUrl" value={formData.coverUrl} onChange={handleChange} />
          </div>

          <div className="formGroup">
            <label>URL PDF</label>
            <input name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Nombre PDF</label>
            <input name="pdfFileName" value={formData.pdfFileName} onChange={handleChange} />
          </div>

          <div className="formGroup">
            <label>Tamaño PDF</label>
            <input
              name="pdfFileSize"
              type="number"
              value={formData.pdfFileSize}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Total páginas</label>
            <input
              name="totalPages"
              type="number"
              value={formData.totalPages}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Estado</label>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
            >
              <option value="activo">activo</option>
              <option value="inactivo">inactivo</option>
            </select>
          </div>

          <div className="formGroup fullWidth">
            <label>
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              Público
            </label>
          </div>

          <div className="formActions">
            <button
              type="button"
              className="secondaryButton"
              onClick={() => navigate("/admin-libros")}
            >
              Cancelar
            </button>
            <button type="submit" className="primaryButton">
              {modoEdicion ? "Guardar cambios" : "Guardar libro"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}