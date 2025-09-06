import './css/Home.css';

export default function Home() {
  return (
    <div id="contenedor-bienvenida">
      <div id="caja-bienvenida">
        <div>
          <h1>Bienvenido al Panel Principal</h1>
          <p>Aquí podrás ver la información de cada informe.</p>
        </div>
        <div id="imagen">
          <img src='/xuma-gris.svg' alt="Imagen centrada" />
        </div>
      </div>
    </div>
  );
}
