import { useState, useEffect } from "react";
import { getReadingProgress } from "../services/booksService.js";

export function useReadingProgress() {
  const [readingProgress, setReadingProgress] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoadingProgress(true);
      try {
        const data = await getReadingProgress(controller.signal);
        setReadingProgress(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setReadingProgress([]);
      } finally {
        setLoadingProgress(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  async function reloadProgress() {
    setLoadingProgress(true);
    try {
      const data = await getReadingProgress();
      setReadingProgress(Array.isArray(data) ? data : []);
    } catch {
      setReadingProgress([]);
    } finally {
      setLoadingProgress(false);
    }
  }

  return { readingProgress, loadingProgress, reloadProgress };
}
