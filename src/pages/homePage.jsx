import BookCard from "../components/bookCard.jsx";
import principitoImg from "../assets/books/principito.jpg";
import libro1984Img from "../assets/books/1984.jpg";
import donquijoteImg from "../assets/books/donquijote.jpg";
import orgulloPrejuicioImg from "../assets/books/orgulloyprejuicio.jpg";
import draculaImg from "../assets/books/dracula.jpg";
import fahrenheitImg from "../assets/books/fahrenheit.jpg";

const continuarLeyendo = [
  {
    id: 1,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    portada: principitoImg,
    progreso: 45,
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    portada: libro1984Img,
    progreso: 70,
  },
];

const recomendados = [
  {
    id: 3,
    titulo: "Don Quijote",
    autor: "Miguel de Cervantes",
    portada: donquijoteImg,
  },
  {
    id: 4,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    portada: orgulloPrejuicioImg,
  },
  {
    id: 5,
    titulo: "Drácula",
    autor: "Bram Stoker",
    portada: draculaImg,
  },
  {
    id: 6,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    portada: fahrenheitImg,
  },
];

const categorias = [
  "Ficción",
  "Historia",
  "Ciencia",
  "Tecnología",
  "Fantasía",
  "Novela",
];

export default function HomePage() {
  return (
    <section className="homePage">
      <section className="heroSection">
        <div className="heroContent">
          <span className="heroBadge">Biblioteca digital</span>
          <h1 className="heroTitle">
            Lee, organiza y continúa tus libros desde un solo lugar
          </h1>
          <p className="heroText">
            Disfruta una experiencia de lectura simple, cómoda y visualmente
            limpia. Explora tus libros, retoma tu progreso y descubre nuevas
            lecturas.
          </p>

          <div className="heroButtons">
            <button className="primaryButton">Explorar biblioteca</button>
            <button className="secondaryButton">Continuar leyendo</button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="heroMiniCard">
            <p className="heroMiniLabel">Leyendo ahora</p>
            <h3>El Principito</h3>
            <p>Capítulo 4 • 45% completado</p>
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeader">
          <h2>Continuar leyendo</h2>
          <p>Retoma tu progreso y sigue donde lo dejaste.</p>
        </div>

        <div className="booksGrid">
          {continuarLeyendo.map((libro) => (
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
          <p>Algunas lecturas destacadas para comenzar.</p>
        </div>

        <div className="booksGrid">
          {recomendados.map((libro) => (
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