import "../css/Login.css";
import { useState } from "react";

const usuarios: Usuario[] = [
  { 
    usuario: "jtuiran",
    nombre: "Jesus Tuiran",
    clave: "2025",
    permisosSecciones: ["Operaciones", "IntelicenciaCanales", "EjecucionComercial"],
    permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora","revision","comercial", "canal-digital", "ejecucion-comercial-gaseras", "ejecucion-comercial-aseguradora"],  
    permisosInformes: [
      "ejecucion-promigas", 
      "ejecucion-parcial", 
      "controladas", 
      "relacionadas", 
      "caribe", 
      "guajira", 
      "efigas", 
      "surtigas", 
      "gdo", 
      "ceo", 
      "hdi", 
      "alfa", 
      "revision-ejecucion",
      "revision-cargue",
      "informe-cargues",
      "informe360",
      "ejecucion",
      "revision",
      "digital-global",
      "digital-caribe",
      "digital-efigas",
      "digital-gdo",
      "digital-surtigas",
      "comercial-caribe",
      "comercial-occidente",
      "comercial-efigas",
      "comercial-gdo",
      "comercial-surtigas",
      "comercial-hdi",
      "comercial-alfa",
      "comercial-ike",
    ]
  }
];

type Usuario = {
  nombre: string;
  usuario: string;
  clave: string;
  permisosSecciones: string[];
  permisosGrupo: string[];
  permisosInformes: string[];
};

type LoginProps = {
  alIniciarSesion: (usuario: Usuario) => void;
};

export default function Login({ alIniciarSesion }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const encontrado = usuarios.find(
      (u) => u.usuario === username && u.clave === password
    );

    if (encontrado) {
      alIniciarSesion(encontrado);
    } else {
      setError("Usuario o contraseña incorrecta");
    }
  };

  return (
    <div id="login-container-vh">
      <div id="login-container">
        <div id="login">
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
                Bienvenido(a) a la app de informes de Xuma Insurtech. Por favor, utiliza este
                recurso de manera responsable. Si tienes dudas, puedes contactarnos
                a <b>support-bi@xuma.la</b>
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
      </div>
    </div>
  );
}
