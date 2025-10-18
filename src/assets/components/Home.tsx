import '../css/Home.css';

export default function Home() {
  return (   

    <div className="contenedor-bienvenida">
      <div className="caja-bienvenida">
        <div>
          <h1>Bienvenido al Panel Principal</h1>
          <p>
            Bienvenido(a) a la app de informes de Xuma Insurtech. Por favor, utiliza este
            recurso de manera responsable. Si tienes dudas, puedes contactarnos
            a <br></br> <b>support-bi@xuma.la</b>
          </p>
        </div>
        <div className="imagen">
          <img src='/xuma-gris.svg' alt="Imagen centrada" />
        </div>
      </div>
    </div>
  );
}
