import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { libros, progresoLectura } from "../data/mockData.js";

export default function HomePage() {
  const navigate = useNavigate();

  const continuarLeyendo = progresoLectura.map((progresoItem) => {
    const libro = libros.find((item) => item.id === progresoItem.libroId);

    return {
      ...libro,
      progreso: progresoItem.progreso,
    };
  });

  const recomendados = libros.slice(0, 4);

  const categorias = [
    "Ficción",
    "Historia",
    "Ciencia ficción",
    "Terror",
    "Tecnología",
    "Novela",
  ];

  return (
    <section className="homePage">
      <section className="heroSection">
        <div className="heroContent">
          <span className="heroBadge">Biblioteca digital</span>

          <h1 className="heroTitle">
            Lee, organiza y continúa tus libros desde un solo lugar
          </h1>

          <p className="heroText">
            Explora tu colección, retoma tus lecturas y administra tus libros
            con una experiencia simple, limpia y enfocada en la lectura.
          </p>

          <div className="heroButtons">
            <button
              className="primaryButton"
              onClick={() => navigate("/biblioteca")}
            >
              Explorar biblioteca
            </button>

            <button
              className="secondaryButton"
              onClick={() => navigate("/mi-biblioteca")}
            >
              Continuar leyendo
            </button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="heroMiniCard">
            <p className="heroMiniLabel">Leyendo ahora</p>
            <h3>{continuarLeyendo[0]?.titulo || "Sin lecturas activas"}</h3>
            <p>
              {continuarLeyendo[0]
                ? `${continuarLeyendo[0].progreso}% completado`
                : "Agrega un libro a tu biblioteca"}
            </p>
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Continuar leyendo</h2>
          <p>Retoma tus libros desde donde los dejaste.</p>
        </div>

        <div className="booksGrid">
          {continuarLeyendo.map((libro) => (
            <div
              key={libro.id}
              onClick={() =>
                navigate("/lectura", {
                  state: { libroId: libro.id },
                })
              }
            >
              <BookCard
                titulo={libro.titulo}
                autor={libro.autor}
                portada={libro.portada}
                progreso={libro.progreso}
                mostrarProgreso={true}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Categorías</h2>
          <p>Explora rápidamente por tipo de lectura.</p>
        </div>

        <div className="categoryContainer">
          {categorias.map((categoria) => (
            <button key={categoria} className="categoryChip">
              {categoria}
            </button>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Libros recomendados</h2>
          <p>Algunas lecturas destacadas dentro del catálogo.</p>
        </div>

        <div className="booksGrid">
          {recomendados.map((libro) => (
            <div
              key={libro.id}
              onClick={() =>
                navigate("/detalle-libro", {
                  state: { libroId: libro.id },
                })
              }
            >
              <BookCard
                titulo={libro.titulo}
                autor={libro.autor}
                portada={libro.portada}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}