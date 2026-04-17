import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <section className="authPage">
      <div className="authCard">
        <h1>Iniciar sesión</h1>
        <p>Accede a tu biblioteca digital personal.</p>

        <form className="authForm" onSubmit={handleSubmit}>
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
            Ingresar
          </button>
        </form>

        <button className="linkButton" onClick={() => navigate("/registro")}>
          ¿No tienes cuenta? Crear una cuenta
        </button>
      </div>
    </section>
  );
}