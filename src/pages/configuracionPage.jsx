export default function ConfiguracionPage() {
  return (
    <section className="configPage">
      <div className="configCard">
        <h1>Configuración</h1>
        <p>Personaliza la experiencia de lectura y navegación de la plataforma.</p>

        <div className="configGroup">
          <h3>Tema</h3>
          <div className="configOptions">
            <button className="secondaryButton">Modo claro</button>
            <button className="secondaryButton">Modo oscuro</button>
          </div>
        </div>

        <div className="configGroup">
          <h3>Tamaño de texto</h3>
          <div className="configOptions">
            <button className="secondaryButton">Pequeño</button>
            <button className="secondaryButton">Mediano</button>
            <button className="secondaryButton">Grande</button>
          </div>
        </div>

        <div className="configGroup">
          <h3>Preferencias de lectura</h3>
          <div className="configOptions">
            <button className="secondaryButton">Ancho normal</button>
            <button className="secondaryButton">Ancho amplio</button>
          </div>
        </div>

        <div className="configGroup">
          <h3>Notificaciones</h3>
          <div className="configOptions">
            <button className="secondaryButton">Activadas</button>
            <button className="secondaryButton">Desactivadas</button>
          </div>
        </div>
      </div>
    </section>
  );
}