import { useNavigate } from "react-router-dom";

export default function RegistroPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <section className="authPage">
      <div className="authCard">
        <h1>Crear cuenta</h1>
        <p>Regístrate para guardar, leer y administrar tus libros.</p>

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="primaryButton authButton">
            Registrarme
          </button>
        </form>

        <button className="linkButton" onClick={() => navigate("/login")}>
          Ya tengo una cuenta
        </button>
      </div>
    </section>
  );
}