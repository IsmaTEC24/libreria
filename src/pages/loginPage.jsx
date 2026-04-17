import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <span className="heroBadge">ReadFlow</span>
          <h1>Iniciar sesión</h1>
          <p>Ingresa con tu correo y contraseña para acceder a tu biblioteca.</p>
        </div>

        {error && <p className="authError">{error}</p>}

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="primaryButton authButton" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <button className="linkButton authLink" onClick={() => navigate("/registro")}>
          ¿No tienes cuenta? Crear una cuenta
        </button>
      </div>
    </section>
  );
}