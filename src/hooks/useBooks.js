import { useState, useEffect } from "react";
import { getBooks } from "../services/booksService.js";

function normalizeBook(book) {
  return {
    ...book,
    userId: book.userId || book.user_id,
    coverBlobName: book.coverBlobName || book.cover_blob_name,
    pdfBlobName: book.pdfBlobName || book.pdf_blob_name,
  };
}

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function reload() {
    setLoading(true);
    setError("");
    try {
      const data = await getBooks();
      setBooks(Array.isArray(data) ? data.map(normalizeBook) : []);
    } catch {
      setError("No se pudieron cargar los libros.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { reload(); }, []);

  return { books, loading, error, reloadBooks: reload };
}
