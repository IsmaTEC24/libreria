import { createContext, useContext, useEffect, useState } from "react";
import {
  getUsers,
  getCategories,
  getBooks,
  getReadingProgress,
  getFavorites,
} from "../services/booksService.js";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [readingProgress, setReadingProgress] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAppData() {
    try {
      setLoading(true);
      setError("");

      const [usersData, categoriesData, booksData, progressData, favoritesData] =
        await Promise.all([
          getUsers(),
          getCategories(),
          getBooks(),
          getReadingProgress(),
          getFavorites(),
        ]);

      setUsers(Array.isArray(usersData) ? usersData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBooks(Array.isArray(booksData) ? booksData : []);
      setReadingProgress(Array.isArray(progressData) ? progressData : []);
      setFavorites(Array.isArray(favoritesData) ? favoritesData : []);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la información de la app.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppData();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        users,
        categories,
        books,
        readingProgress,
        favorites,
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