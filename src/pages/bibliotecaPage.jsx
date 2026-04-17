import { useNavigate } from "react-router-dom";
import BookCard from "../components/bookCard.jsx";
import { libros } from "../data/mockData.js";

export default function BibliotecaPage() {
  const navigate = useNavigate();

  return (
    <section className="bibliotecaPage">
      <div className="sectionHeader">
        <h1>Biblioteca</h1>
        <p>Explora todos los libros disponibles en la plataforma.</p>
      </div>

      <div className="booksGrid">
        {libros.map((libro) => (
          <div
            key={libro.id}
            onClick={() => navigate("/detalle-libro", { state: { libroId: libro.id } })}
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
  );
}