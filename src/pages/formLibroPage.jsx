import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBookWithPdf,
  getBookById,
  updateBook,
} from "../services/booksService.js";
import { useAuth } from "../context/authContext.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function FormLibroPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { categories, reloadAppData } = useAppData();

  const libroId = location.state?.libroId;
  const modoEdicion = Boolean(libroId);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    language: "es",
    currentStatus: "activo",
    isPublic: true,
  });

  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(modoEdicion);

  useEffect(() => {
    async function loadBook() {
      if (!modoEdicion) return;
      try {
        const data = await getBookById(libroId);
        setFormData({
          title: data.title || "",
          author: data.author || "",
          category: data.category || "",
          description: data.description || "",
          language: data.language || "es",
          currentStatus: data.currentStatus || data.current_status || "activo",
          isPublic: data.isPublic ?? data.is_public ?? true,
        });
        if (data.coverUrl) setCoverPreview(data.coverUrl);
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

  function handleCoverChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function handlePdfChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPdfFile(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!modoEdicion && !pdfFile) {
      alert("Debes subir un archivo PDF.");
      return;
    }

    try {
      const userId =
        currentUser?.id ||
        currentUser?.userId ||
        currentUser?.user_id ||
        currentUser?.uid ||
        null;

      if (!userId) {
        alert("No se pudo identificar el usuario actual.");
        return;
      }

      const bookData = {
        userId,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description || "",
        language: formData.language || "es",
        currentStatus: formData.currentStatus || "activo",
        isPublic: formData.isPublic ?? true,
      };

      if (modoEdicion) {
        alert("La edición de libros todavía no está conectada al backend nuevo.");
        return;
      }

      await createBookWithPdf(bookData, pdfFile, coverFile);

      await reloadAppData();
      navigate("/admin-libros");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el libro.");
    }
  }

  if (!currentUser) return <p>Debes iniciar sesión.</p>;
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
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Autor</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.label || category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Idioma</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
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
            <label>Portada (PNG/JPG)</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleCoverChange}
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Portada"
                style={{ marginTop: 8, width: 80, borderRadius: 4 }}
              />
            )}
          </div>

          <div className="formGroup">
            <label>Archivo PDF {!modoEdicion && <span style={{ color: "red" }}>*</span>}</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              required={!modoEdicion}
            />
            {pdfFile && (
              <small style={{ marginTop: 4, display: "block" }}>
                {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
              </small>
            )}
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
              {" "}Público
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
