import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout.jsx";
import HomePage from "./pages/homePage.jsx";
import BibliotecaPage from "./pages/bibliotecaPage.jsx";
import LecturaPage from "./pages/lecturaPage.jsx";
import AdminLibrosPage from "./pages/adminLibrosPage.jsx";
import ConfiguracionPage from "./pages/configuracionPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="biblioteca" element={<BibliotecaPage />} />
        <Route path="lectura" element={<LecturaPage />} />
        <Route path="admin-libros" element={<AdminLibrosPage />} />
        <Route path="configuracion" element={<ConfiguracionPage />} />
      </Route>
    </Routes>
  );
}