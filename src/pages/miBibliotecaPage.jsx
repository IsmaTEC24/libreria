import BookCard from "../components/bookCard.jsx";
import { libros, progresoLectura, favoritos } from "../data/mockData.js";

export default function MiBibliotecaPage() {
  const librosLeyendo = progresoLectura.map((progresoItem) => {
    const libro = libros.find((item) => item.id === progresoItem.libroId);

    return {
      ...libro,
      progreso: progresoItem.progreso,
    };
  });

  const librosFavoritos = favoritos.map((favoritoItem) => {
    return libros.find((item) => item.id === favoritoItem.libroId);
  });

  return (
    <section className="miBibliotecaPage">
      <div className="sectionHeader">
        <h1>Mi biblioteca</h1>
        <p>Consulta tus favoritos, lecturas actuales y libros guardados.</p>
      </div>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Continuar leyendo</h2>
          <p>Libros que tienes en progreso actualmente.</p>
        </div>

        <div className="booksGrid">
          {librosLeyendo.map((libro) => (
            <BookCard
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              portada={libro.portada}
              progreso={libro.progreso}
              mostrarProgreso={true}
            />
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Favoritos</h2>
          <p>Libros guardados para leer más tarde.</p>
        </div>

        <div className="booksGrid">
          {librosFavoritos.map((libro) => (
            <BookCard
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              portada={libro.portada}
            />
          ))}
        </div>
      </section>
    </section>
  );
}