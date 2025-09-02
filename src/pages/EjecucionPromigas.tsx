import { useState } from "react";
import "./css/EJpromigas.css";

const EjecucionPromigas = () => {
  // Estados para usuario, contraseña y estado de autenticación
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);

  const handleLogin = () => {
    // Validación simple de usuario y contraseña
    if (username === "xuma" && password === "2025") {
      setLogged(true);
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  if (logged) {
    return (
      <div id="iframe-container" style={{ display: "block" }}>
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiYjQ5ZjQyYWEtZGEyMS00NTE1LWI4YmMtYTk3ZGY2NDdiN2RmIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9"
          title="Informe PowerBI"
        ></iframe>
      </div>
    );
  }

  return (
    <div id="login-container">
      <div className="header">
        <div className="logo">
          <img src="/xuma-blanco.svg" alt="Logo-Xuma" />
        </div>
        <div className="welcome">
          <div className="icono">
            <img src="/iconoinforme.svg" alt="Icono" />
          </div>
          <h2>Informe de Ejecución</h2>
          <p>
            Bienvenido(a) al Informe de Ejecución. Por favor, utiliza este
            recurso de manera responsable. Si tienes dudas, puedes contactarnos
            a jtuiran@xuma.la
          </p>
        </div>
      </div>

      <div className="box">
      <div className="login-box">
        <span className="Titulo-box">Autenticación</span>
      </div>

      <div className="login-box">
        <input
          type="text"
          id="username"
          placeholder="Usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="login-box">
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="login-box">
        <button onClick={handleLogin}>Ingresar</button>
      </div>
      </div>
    </div>
  );
};

export default EjecucionPromigas;