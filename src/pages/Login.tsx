import "./css/Login.css";
import { useState } from "react";

const usuarios = [
  { nombre: "xuma", clave: "2025" },
  { nombre: "admin", clave: "1234" },
];

type LoginProps = {
  alIniciarSesion: (usuario: string) => void;
};

export default function Login({ alIniciarSesion }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const encontrado = usuarios.find(
      (u) => u.nombre === username && u.clave === password
    );

    if (encontrado) {
      alIniciarSesion(encontrado.nombre);
    } else {
      setError("Usuario o contraseña incorrecta");
    }
  };

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
            a <b>jtuiran@xuma.la</b>
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

        {error && (
          <div className="login-box">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}