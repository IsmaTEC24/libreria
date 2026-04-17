export default function BookCard({
  titulo,
  autor,
  portada,
  progreso,
  mostrarProgreso = false,
}) {
  return (
    <article className="bookCard">
      <img
        src={portada}
        alt={`Portada de ${titulo}`}
        className="bookCardImage"
      />

      <div className="bookCardBody">
        <h3 className="bookCardTitle">{titulo}</h3>
        <p className="bookCardAuthor">{autor}</p>

        {mostrarProgreso && (
          <div className="bookProgressContainer">
            <div className="bookProgressBar">
              <div
                className="bookProgressFill"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <span className="bookProgressText">{progreso}% leído</span>
          </div>
        )}

        <button className="primaryButton">
          {mostrarProgreso ? "Continuar leyendo" : "Leer ahora"}
        </button>
      </div>
    </article>
  );
}