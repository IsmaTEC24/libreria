import principitoImg from "../assets/books/principito.jpg";
import libro1984Img from "../assets/books/1984.jpg";
import donquijoteImg from "../assets/books/donquijote.jpg";
import orgulloPrejuicioImg from "../assets/books/orgulloyprejuicio.jpg";
import draculaImg from "../assets/books/dracula.jpg";
import fahrenheitImg from "../assets/books/fahrenheit.jpg";

export const usuarios = [
  {
    id: 1,
    nombre: "Daniel Mora",
    correo: "daniel@email.com",
    rol: "Lector",
    avatarIniciales: "DM",
  },
  {
    id: 2,
    nombre: "María López",
    correo: "maria@email.com",
    rol: "Administrador",
    avatarIniciales: "ML",
  },
];

export const libros = [
  {
    id: 1,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Ficción",
    descripcion:
      "Una obra clásica que combina imaginación, crítica social y reflexión sobre la vida.",
    estado: "Publicado",
    paginas: 96,
    idioma: "Español",
    portada: principitoImg,
    pdfUrl: "/pdfs/principito.pdf",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Ciencia ficción",
    descripcion:
      "Una novela distópica que explora el control social, la vigilancia y la manipulación.",
    estado: "Publicado",
    paginas: 328,
    idioma: "Español",
    portada: libro1984Img,
    pdfUrl: "/pdfs/1984.pdf",
  },
  {
    id: 3,
    titulo: "Drácula",
    autor: "Bram Stoker",
    categoria: "Terror",
    descripcion:
      "Un clásico del terror gótico con un enfoque epistolar y una narrativa intensa.",
    estado: "Borrador",
    paginas: 418,
    idioma: "Español",
    portada: draculaImg,
    pdfUrl: "/pdfs/dracula.pdf",
  },
  {
    id: 4,
    titulo: "Don Quijote",
    autor: "Miguel de Cervantes",
    categoria: "Clásico",
    descripcion:
      "Una de las obras más importantes de la literatura en español.",
    estado: "Publicado",
    paginas: 863,
    idioma: "Español",
    portada: donquijoteImg,
    pdfUrl: "/pdfs/quijote.pdf",
  },
];

export const progresoLectura = [
  {
    id: 1,
    usuarioId: 1,
    libroId: 1,
    progreso: 45,
    paginaActual: 4,
    totalPaginas: 10,
  },
  {
    id: 2,
    usuarioId: 1,
    libroId: 2,
    progreso: 70,
    paginaActual: 7,
    totalPaginas: 10,
  },
  {
    id: 3,
    usuarioId: 1,
    libroId: 3,
    progreso: 20,
    paginaActual: 2,
    totalPaginas: 10,
  },
];

export const favoritos = [
  {
    id: 1,
    usuarioId: 1,
    libroId: 1,
  },
  {
    id: 2,
    usuarioId: 1,
    libroId: 2,
  },
];