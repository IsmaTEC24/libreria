import { useNavigate } from "react-router-dom";
import { libros } from "../data/mockData.js";

export default function AdminLibrosPage() {
  const navigate = useNavigate();

  return (
    <section className="adminPage">
      <div className="adminHeader">
        <div>
          <h1>Administrar libros</h1>
          <p>
            Gestiona el catálogo de libros y deja la estructura lista para traer
            los datos desde Azure.
          </p>
        </div>

        <button
          className="primaryButton"
          onClick={() => navigate("/nuevo-libro")}
        >
          + Nuevo libro
        </button>
      </div>

      <div className="adminToolbar">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          className="searchInput adminSearch"
        />

        <select className="adminSelect">
          <option>Todos los estados</option>
          <option>Publicado</option>
          <option>Borrador</option>
        </select>
      </div>

      <div className="tableContainer">
        <table className="booksTable">
          <thead>
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {libros.map((libro) => (
              <tr key={libro.id}>
                <td>
                  <img
                    src={libro.portada}
                    alt={libro.titulo}
                    className="tableBookImage"
                  />
                </td>

                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.categoria}</td>

                <td>
                  <span
                    className={
                      libro.estado === "Publicado"
                        ? "statusBadge published"
                        : "statusBadge draft"
                    }
                  >
                    {libro.estado}
                  </span>
                </td>

                <td>
                  <div className="tableActions">
                    <button
                      className="editButton"
                      onClick={() =>
                        navigate("/editar-libro", {
                          state: {
                            modo: "editar",
                            libroId: libro.id,
                          },
                        })
                      }
                    >
                      Editar
                    </button>

                    <button className="deleteButton">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="paginationContainer">
        <button className="secondaryButton">← Anterior</button>
        <span className="paginationInfo">Página 1 de 3</span>
        <button className="secondaryButton">Siguiente →</button>
      </div>
    </section>
  );
}