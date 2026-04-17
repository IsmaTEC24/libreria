import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppData } from "../context/appDataContext.jsx";

export default function LecturaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { books, readingProgress, loading, error } = useAppData();

  const libroId = location.state?.libroId || 1;

  const book = useMemo(() => {
    return books.find((item) => item.id === libroId);
  }, [books, libroId]);

  const progresoLibro = useMemo(() => {
    return readingProgress.find((item) => item.bookId === libroId) || null;
  }, [readingProgress, libroId]);

  const paginasSimuladas = [
    `Este espacio representa la lectura del PDF.
Más adelante aquí puedes mostrar el visor real del documento.`,
    `Por ahora el lector sigue funcionando con páginas simuladas,
mientras conectan la lectura completa del archivo PDF.`,
    `La estructura ya queda lista para integrar el contenido real
sin cambiar toda la interfaz visual.`,
  ];

  const paginaInicial =
    progresoLibro?.currentPage && progresoLibro.currentPage <= paginasSimuladas.length
      ? progresoLibro.currentPage - 1
      : 0;

  const [paginaActual, setPaginaActual] = useState(paginaInicial);
  const [tamanoFuente, setTamanoFuente] = useState(18);
  const [modoOscuroLectura, setModoOscuroLectura] = useState(false);
  const [anchoLectura, setAnchoLectura] = useState("normal");

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

  if (loading) return <p>Cargando lectura...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Libro no encontrado.</p>;

  return (
    <section className="lecturaPage">
      <div className="readingWrapper">
        <header className="readingHeader">
          <div className="readingHeaderLeft">
            <button
              className="backButton"
              onClick={() =>
                navigate("/detalle-libro", { state: { libroId: book.id } })
              }
            >
              ← Volver al detalle
            </button>

            <div>
              <p className="readingLabel">Modo lectura</p>
              <h1 className="readingTitle">{book.title}</h1>
              <p className="readingAuthor">{book.author}</p>
            </div>
          </div>

          <div className="readingTools">
            <button
              className="toolButton"
              onClick={() => setTamanoFuente((prev) => Math.max(prev - 2, 14))}
            >
              A-
            </button>
            <button
              className="toolButton"
              onClick={() => setTamanoFuente((prev) => prev + 2)}
            >
              A+
            </button>
            <button
              className="toolButton"
              onClick={() =>
                setAnchoLectura((prev) => (prev === "normal" ? "amplio" : "normal"))
              }
            >
              {anchoLectura === "normal" ? "Ancho +" : "Ancho -"}
            </button>
            <button
              className="toolButton"
              onClick={() => setModoOscuroLectura((prev) => !prev)}
            >
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
            Página {paginaActual + 1} de {totalPaginas} • {Math.round(progreso)}% completado
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