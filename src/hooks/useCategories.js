import { useState, useEffect } from "react";
import { getCategories } from "../services/booksService.js";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return { categories };
}
