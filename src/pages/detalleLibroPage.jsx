import { useLocation, useNavigate } from "react-router-dom";
import { libros } from "../data/mockData.js";

export default function DetalleLibroPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const libroId = location.state?.libroId || 1;
  const libro = libros.find((item) => item.id === libroId) || libros[0];

  return (
    <section className="detalleLibroPage">
      <div className="detalleLibroCard">
        <img
          src={libro.portada}
          alt={`Portada de ${libro.titulo}`}
          className="detalleLibroImage"
        />

        <div className="detalleLibroContent">
          <span className="heroBadge">{libro.categoria}</span>
          <h1>{libro.titulo}</h1>
          <p className="detalleAutor">{libro.autor}</p>
          <p className="detalleDescripcion">{libro.descripcion}</p>

          <div className="detalleMeta">
            <div className="metaItem">
              <strong>Estado</strong>
              <span>{libro.estado}</span>
            </div>

            <div className="metaItem">
              <strong>Páginas</strong>
              <span>{libro.paginas}</span>
            </div>

            <div className="metaItem">
              <strong>Idioma</strong>
              <span>{libro.idioma}</span>
            </div>
          </div>

          <div className="detalleActions">
            <button
              className="primaryButton"
              onClick={() => navigate("/lectura", { state: { libroId: libro.id } })}
            >
              Leer ahora
            </button>

            <button className="secondaryButton">Agregar a favoritos</button>
          </div>
        </div>
      </div>
    </section>
  );
}