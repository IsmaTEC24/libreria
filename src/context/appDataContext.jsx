import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, getCategories, getBooks } from "../services/booksService.js";
import { useAuth } from "./authContext.jsx";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAppData() {
    try {
      setLoading(true);
      setError("");

      const [usersRes, categoriesRes, booksRes] = await Promise.allSettled([
        getUsers(),
        getCategories(),
        getBooks(),
      ]);

      const val = (r) => (r.status === "fulfilled" && Array.isArray(r.value) ? r.value : []);

      const normalizeBooks = (arr) =>
        arr.map((book) => ({
          ...book,
          userId: book.userId || book.user_id,
          coverBlobName: book.coverBlobName || book.cover_blob_name,
          pdfBlobName: book.pdfBlobName || book.pdf_blob_name,
        }));

      setUsers(val(usersRes));
      setCategories(val(categoriesRes));
      setBooks(normalizeBooks(val(booksRes)));
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la información de la app.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser?.id) {
      loadAppData();
    }
  }, [currentUser?.id]);

  return (
    <AppDataContext.Provider
      value={{
        users,
        categories,
        books,
        loading,
        error,
        reloadAppData: loadAppData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
