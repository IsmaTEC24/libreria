import { usuarios } from "../data/mockData.js";

export default function PerfilPage() {
  const usuario = usuarios[0];

  return (
    <section className="perfilPage">
      <div className="perfilCard">
        <div className="perfilHeader">
          <div className="perfilAvatar">{usuario.avatarIniciales}</div>

          <div>
            <h1>{usuario.nombre}</h1>
            <p>{usuario.correo}</p>
            <span className="heroBadge">{usuario.rol}</span>
          </div>
        </div>

        <div className="perfilStats">
          <div className="statBox">
            <h3>12</h3>
            <p>Favoritos</p>
          </div>

          <div className="statBox">
            <h3>3</h3>
            <p>Leyendo</p>
          </div>

          <div className="statBox">
            <h3>18</h3>
            <p>Terminados</p>
          </div>
        </div>
      </div>
    </section>
  );
}