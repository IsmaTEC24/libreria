import { useMemo } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useAppData } from "../context/appDataContext.jsx";

export default function PerfilPage() {
  const { currentUser } = useAuth();
  const { books, favorites, readingProgress, loading, error } = useAppData();

  const totalBooks = useMemo(() => {
    if (!currentUser) return 0;
    return books.filter((book) => book.userId === currentUser.id).length;
  }, [books, currentUser]);

  const totalFavorites = useMemo(() => {
    if (!currentUser) return 0;
    return favorites.filter((fav) => fav.userId === currentUser.id).length;
  }, [favorites, currentUser]);

  const totalReading = useMemo(() => {
    if (!currentUser) return 0;
    return readingProgress.filter((item) => item.userId === currentUser.id).length;
  }, [readingProgress, currentUser]);

  if (!currentUser) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="perfilPage">
      <div className="perfilCard">
        <div className="perfilHeader">
          <div className="perfilAvatar">{currentUser.initials}</div>

          <div>
            <h1>{currentUser.name}</h1>
            <p>{currentUser.email}</p>
            <span className="heroBadge">@{currentUser.username}</span>
          </div>
        </div>

        <div className="perfilStats">
          <div className="statBox">
            <h3>{totalBooks}</h3>
            <p>Libros</p>
          </div>

          <div className="statBox">
            <h3>{totalFavorites}</h3>
            <p>Favoritos</p>
          </div>

          <div className="statBox">
            <h3>{totalReading}</h3>
            <p>En lectura</p>
          </div>
        </div>
      </div>
    </section>
  );
}