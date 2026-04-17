import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookById } from "../services/booksService.js";

export default function LecturaPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const libroId = location.state?.libroId || 1;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const paginasSimuladas = [
    `Este espacio representa la lectura del PDF.
Más adelante aquí puedes mostrar el visor real del documento.`,

    `Por ahora el lector sigue funcionando con páginas simuladas,
mientras conectan la lectura completa del archivo PDF.`,

    `La estructura ya queda lista para integrar el contenido real
sin cambiar toda la interfaz visual.`,
  ];

  const [paginaActual, setPaginaActual] = useState(0);
  const [tamanoFuente, setTamanoFuente] = useState(18);
  const [modoOscuroLectura, setModoOscuroLectura] = useState(false);
  const [anchoLectura, setAnchoLectura] = useState("normal");

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        setError("");

        const data = await getBookById(libroId);
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el libro.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [libroId]);

  const totalPaginas = paginasSimuladas.length;
  const progreso = ((paginaActual + 1) / totalPaginas) * 100;

  function irPaginaAnterior() {
    if (paginaActual > 0) {
      setPaginaActual((prev) => prev - 1);
    }
  }

  function irPaginaSiguiente() {
    if (paginaActual < totalPaginas - 1) {
      setPaginaActual((prev) => prev + 1);
    }
  }

  function aumentarFuente() {
    setTamanoFuente((prev) => prev + 2);
  }

  function disminuirFuente() {
    if (tamanoFuente > 14) {
      setTamanoFuente((prev) => prev - 2);
    }
  }

  function cambiarTemaLectura() {
    setModoOscuroLectura((prev) => !prev);
  }

  function cambiarAnchoLectura() {
    setAnchoLectura((prev) => (prev === "normal" ? "amplio" : "normal"));
  }

  if (loading) {
    return (
      <section className="lecturaPage">
        <div className="readingWrapper">
          <p>Cargando libro...</p>
        </div>
      </section>
    );
  }

  if (error || !book) {
    return (
      <section className="lecturaPage">
        <div className="readingWrapper">
          <p>{error || "Libro no encontrado."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="lecturaPage">
      <div className="readingWrapper">
        <header className="readingHeader">
          <div className="readingHeaderLeft">
            <button
              className="backButton"
              onClick={() =>
                navigate("/detalle-libro", {
                  state: { libroId: book.id },
                })
              }
            >
              ← Volver al detalle
            </button>

            <div>
              <p className="readingLabel">Modo lectura</p>
              <h1 className="readingTitle">{book.titulo}</h1>
              <p className="readingAuthor">{book.autor}</p>
            </div>
          </div>

          <div className="readingTools">
            <button className="toolButton" onClick={disminuirFuente}>
              A-
            </button>

            <button className="toolButton" onClick={aumentarFuente}>
              A+
            </button>

            <button className="toolButton" onClick={cambiarAnchoLectura}>
              {anchoLectura === "normal" ? "Ancho +" : "Ancho -"}
            </button>

            <button className="toolButton" onClick={cambiarTemaLectura}>
              {modoOscuroLectura ? "☀ Claro" : "🌙 Oscuro"}
            </button>
          </div>
        </header>

        <div className="readingProgressSection">
          <div className="readingProgressBar">
            <div
              className="readingProgressFill"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>

          <p className="readingProgressText">
            Página {paginaActual + 1} de {totalPaginas} • {Math.round(progreso)}%
            completado
          </p>
        </div>

        <article
          className={`readingContainer ${modoOscuroLectura ? "readingDark" : ""} ${
            anchoLectura === "amplio" ? "readingWide" : "readingNormal"
          }`}
          style={{ fontSize: `${tamanoFuente}px` }}
        >
          <p className="readingText">{paginasSimuladas[paginaActual]}</p>
        </article>

        <div className="readingFooter">
          <button
            className="secondaryButton"
            onClick={irPaginaAnterior}
            disabled={paginaActual === 0}
          >
            ← Página anterior
          </button>

          <span className="readingPageIndicator">
            {paginaActual + 1} / {totalPaginas}
          </span>

          <button
            className="primaryButton"
            onClick={irPaginaSiguiente}
            disabled={paginaActual === totalPaginas - 1}
          >
            Página siguiente →
          </button>
        </div>
      </div>
    </section>
  );
}