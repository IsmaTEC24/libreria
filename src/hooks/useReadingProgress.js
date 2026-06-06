import { useState, useEffect } from "react";
import { getReadingProgress } from "../services/booksService.js";

export function useReadingProgress() {
  const [readingProgress, setReadingProgress] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  async function reload() {
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

  useEffect(() => { reload(); }, []);

  return { readingProgress, loadingProgress, reloadProgress: reload };
}
