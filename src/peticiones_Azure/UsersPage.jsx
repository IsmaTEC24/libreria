import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/usersService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [newUser, setNewUser] = useState({
    nombre: "",
    correo: "",
    avatarIniciales: ""
  });

  const [editUser, setEditUser] = useState({
    nombre: "",
    correo: "",
    avatarIniciales: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }

  function handleCreateChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function openEditForm(user) {
    setEditingUserId(user.userId);
    setEditUser({
      nombre: user.nombre || "",
      correo: user.correo || "",
      avatarIniciales: user.avatarIniciales || ""
    });
  }

  function cancelEdit() {
    setEditingUserId(null);
    setEditUser({
      nombre: "",
      correo: "",
      avatarIniciales: ""
    });
  }

  async function handleCreateUser(e) {
    e.preventDefault();

    if (!newUser.nombre || !newUser.correo) {
      alert("Nombre y correo son obligatorios.");
      return;
    }

    try {
      await createUser(newUser);

      const localUser = {
        userId: Date.now(),
        ...newUser
      };

      setUsers((prev) => [...prev, localUser]);

      setNewUser({
        nombre: "",
        correo: "",
        avatarIniciales: ""
      });

      setShowCreateForm(false);
      alert("Usuario creado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al crear el usuario.");
    }
  }

  async function handleUpdateUser(e) {
    e.preventDefault();

    if (!editUser.nombre || !editUser.correo) {
      alert("Nombre y correo son obligatorios.");
      return;
    }

    try {
      await updateUser(editingUserId, editUser);

      setUsers((prev) =>
        prev.map((user) =>
          user.userId === editingUserId
            ? { ...user, ...editUser }
            : user
        )
      );

      setEditingUserId(null);
      setEditUser({
        nombre: "",
        correo: "",
        avatarIniciales: ""
      });

      alert("Usuario actualizado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el usuario.");
    }
  }

  async function handleDeleteUser(userId) {
    const confirmDelete = window.confirm("¿Deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      alert("Usuario eliminado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el usuario.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1 style={{ margin: 0, color: "#222" }}>Usuarios</h1>

        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: "10px 16px",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Agregar usuario
        </button>
      </div>

      {showCreateForm && (
        <section
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "25px"
          }}
        >
          <h2 style={{ marginTop: 0 }}>Crear usuario</h2>

          <form
            onSubmit={handleCreateUser}
            style={{ display: "grid", gap: "10px", maxWidth: "500px" }}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={newUser.nombre}
              onChange={handleCreateChange}
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={newUser.correo}
              onChange={handleCreateChange}
            />

            <input
              type="text"
              name="avatarIniciales"
              placeholder="Iniciales"
              value={newUser.avatarIniciales}
              onChange={handleCreateChange}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Guardar usuario
              </button>

              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#ccc",
                  color: "#222",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {loading && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          Cargando usuarios...
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            color: "#b00020",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          No hay usuarios para mostrar.
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div style={{ display: "grid", gap: "16px" }}>
          {users.map((user) => (
            <article
              key={user.userId}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
              }}
            >
              {editingUserId === user.userId ? (
                <form
                  onSubmit={handleUpdateUser}
                  style={{ display: "grid", gap: "10px", maxWidth: "500px" }}
                >
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={editUser.nombre}
                    onChange={handleEditChange}
                  />

                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={editUser.correo}
                    onChange={handleEditChange}
                  />

                  <input
                    type="text"
                    name="avatarIniciales"
                    placeholder="Iniciales"
                    value={editUser.avatarIniciales}
                    onChange={handleEditChange}
                  />

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#222",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Guardar cambios
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#ccc",
                        color: "#222",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#222",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "12px"
                    }}
                  >
                    {user.avatarIniciales || "U"}
                  </div>

                  <h2 style={{ margin: "0 0 8px 0", color: "#222" }}>
                    {user.nombre || "Sin nombre"}
                  </h2>

                  <p style={{ margin: "4px 0", color: "#444" }}>
                    <strong>Correo:</strong> {user.correo || "No disponible"}
                  </p>

                  <p style={{ margin: "4px 0", color: "#444" }}>
                    <strong>ID:</strong> {user.userId}
                  </p>

                  <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                    <button
                      onClick={() => openEditForm(user)}
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#1e88e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.userId)}
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#b00020",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}