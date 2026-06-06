import { useState, useEffect } from "react";
import { getFavorites } from "../services/booksService.js";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loadingFav, setLoadingFav] = useState(true);

  async function reload() {
    setLoadingFav(true);
    try {
      const data = await getFavorites();
      setFavorites(Array.isArray(data) ? data : []);
    } catch {
      setFavorites([]);
    } finally {
      setLoadingFav(false);
    }
  }

  useEffect(() => { reload(); }, []);

  return { favorites, loadingFav, reloadFavorites: reload };
}
