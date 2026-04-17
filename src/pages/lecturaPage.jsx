import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { libros } from "../data/mockData.js";

export default function LecturaPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const libroId = location.state?.libroId || 1;
  const libro = libros.find((item) => item.id === libroId) || libros[0];

  const paginasSimuladas = [
    `Cuando yo tenía seis años vi en un libro sobre la selva virgen una magnífica lámina.
Representaba una serpiente boa que se tragaba a una fiera. En el libro decía:
"Las boas tragan a sus presas enteras, sin masticarlas..."`,

    `Reflexioné mucho en ese momento sobre las aventuras de la jungla y, a mi vez,
logré trazar con un lápiz de colores mi primer dibujo. Mi dibujo número uno era así.
Enseñé mi obra maestra a las personas grandes y les pregunté si mi dibujo les daba miedo.`,

    `Me contestaron: "¿Por qué habría de asustar un sombrero?" Mi dibujo no representaba un sombrero.
Representaba una serpiente boa que digería un elefante. Dibujé entonces el interior de la serpiente
boa para que las personas grandes pudieran comprender.`,

    `Las personas grandes me aconsejaron que dejara a un lado los dibujos de serpientes boas abiertas o cerradas
y que me interesara un poco más en la geografía, la historia, el cálculo y la gramática.`,

    `Fue así como abandoné, a la edad de seis años, una magnífica carrera de pintor.
Había quedado desilusionado por el fracaso de mi dibujo número uno y de mi dibujo número dos.`,
  ];

  const [paginaActual, setPaginaActual] = useState(0);
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

  return (
    <section className="lecturaPage">
      <div className="readingWrapper">
        <header className="readingHeader">
          <div className="readingHeaderLeft">
            <button
              className="backButton"
              onClick={() => navigate("/detalle-libro", { state: { libroId: libro.id } })}
            >
              ← Volver al detalle
            </button>

            <div>
              <p className="readingLabel">Modo lectura</p>
              <h1 className="readingTitle">{libro.titulo}</h1>
              <p className="readingAuthor">{libro.autor}</p>
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