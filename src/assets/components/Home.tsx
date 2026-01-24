import { useRef, useEffect, useState } from "react";
import "../css/Home.css";

export default function Home() {
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const [isFull, setIsFull] = useState(false);

  const toggleFullScreen = () => {
    const el = contenedorRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 🔁 Sincroniza el estado con el navegador
  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFull(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  return (
    <div className="contenedor-bienvenida" ref={contenedorRef}>
      <div className="Mensaje-bienvenida">
        <h1>Bienvenido al Panel Principal</h1>
        <p>
          Este panel centraliza la información clave para la gestión en{" "}
          <strong>Xuma Insurtech</strong>.
          <br />
          Utilízalo de forma responsable. Si necesitas ayuda, escríbenos a{" "}
          <a href="mailto:support-bi@xuma.la?subject=Soporte%20Panel%20BI">
            <strong>support-bi@xuma.la</strong>
          </a>
        </p>
      </div>

      <button onClick={toggleFullScreen}>
        {isFull ? "Salir" : "Pantalla completa"}
      </button>

      <img
        src="/Fondo-Home.svg"
        alt="Fondo"
        className="imagen-bienvenida"
      />
    </div>
  );
}

