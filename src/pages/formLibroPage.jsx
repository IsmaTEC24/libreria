import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { libros } from "../data/mockData.js";

export default function FormLibroPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const modoEdicion = location.state?.modo === "editar";
  const libroId = location.state?.libroId;

  const libroEditar = libros.find((item) => item.id === libroId);

  const [formData, setFormData] = useState({
    titulo: libroEditar?.titulo || "",
    autor: libroEditar?.autor || "",
    categoria: libroEditar?.categoria || "",
    descripcion: libroEditar?.descripcion || "",
    estado: libroEditar?.estado || "Borrador",
    portada: null,
    pdf: null,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const { name, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Libro enviado:", formData);
    navigate("/admin-libros");
  }

  return (
    <section className="formPage">
      <div className="formContainer">
        <div className="formHeader">
          <h1>{modoEdicion ? "Editar libro" : "Nuevo libro"}</h1>
          <p>
            {modoEdicion
              ? "Modifica la información del libro y deja lista su estructura para Azure."
              : "Agrega la información del libro y deja lista su estructura para Azure."}
          </p>
        </div>

        <form className="formGrid" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="autor">Autor</label>
            <input
              id="autor"
              name="autor"
              type="text"
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="Ficción">Ficción</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Historia">Historia</option>
              <option value="Terror">Terror</option>
              <option value="Educación">Educación</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Novela">Novela</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="Publicado">Publicado</option>
              <option value="Borrador">Borrador</option>
            </select>
          </div>

          <div className="formGroup fullWidth">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="5"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="portada">Portada</label>
            <input
              id="portada"
              name="portada"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="pdf">Archivo PDF</label>
            <input
              id="pdf"
              name="pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
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