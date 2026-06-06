import { useState, useEffect } from "react";
import { getFavorites } from "../services/booksService.js";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loadingFav, setLoadingFav] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoadingFav(true);
      try {
        const data = await getFavorites(controller.signal);
        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setFavorites([]);
      } finally {
        setLoadingFav(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  async function reloadFavorites() {
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

  return { favorites, loadingFav, reloadFavorites };
}
