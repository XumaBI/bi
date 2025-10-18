import "../css/Login.css";
import { useState } from "react";

const usuarios: Usuario[] = [
  { 
    usuario: "jtuiran",
    nombre: "Jesus Tuiran",
    clave: "2025",
    permisosSecciones: ["informe", "integracion"],
    permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora","revision","comercial","Modulo-Operaciones"],
    permisosInformes: ["ejecucion-promigas", "ejecucion-parcial", "controladas", "relacionadas", "caribe", "guajira", "efigas", "surtigas", "gdo", "ceo", "hdi", "alfa", "revision-ejecucion","revision-cargue","informe-cargues","informe360","ejecucion","revision","condiciones","activos","tramitado"]
  },
  { 
    usuario: "lmiranda",
    nombre: "Laura Miranda",
    clave: "102217",
    permisosSecciones: ["informe", "integracion"],
    permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora","revision","comercial"],
    permisosInformes: ["ejecucion-promigas","revision-ejecucion","revision-cargue","informe-cargues"] 
  },
  { 
  usuario: "dpercia",
  nombre: "Dayanna Percia",
  clave: "120711",
  permisosSecciones: ["informe", "integracion"],
  permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora","revision","comercial"],
  permisosInformes: ["ejecucion-promigas"] 
  },
  { 
    usuario: "aacebedo",
    nombre: "Andres Acebedo",
    clave: "xuma2025",
    permisosSecciones: ["informe", "integracion"],
    permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora","comercial"],
    permisosInformes: ["ejecucion-promigas", "ejecucion-parcial", "controladas", "relacionadas", "caribe", "guajira", "efigas", "surtigas", "gdo", "ceo", "hdi", "alfa","informe-cargues"] 
  },
  { 
    usuario: "cmunera",
    nombre: "Carolina Munera",
    clave: "promi2025",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-global","ejecucion-distribuidora","ejecucion-aseguradora"],
    permisosInformes: ["ejecucion-promigas", "ejecucion-parcial", "controladas", "relacionadas", "caribe", "guajira", "efigas", "surtigas", "gdo", "ceo", "hdi", "alfa"]
  },
  { 
    usuario: "caribe",
    nombre: "Gases del Caribe",
    clave: "2025",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["caribe"]
  },
  { 
    usuario: "guajira",
    nombre: "Gases de la Guajira",
    clave: "c914",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["guajira"] 
  },
  { 
    usuario: "efigas",
    nombre: "Efigas",
    clave: "e741",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["efigas"] 
  },
  { 
    usuario: "surtigas",
    nombre: "Surtigas",
    clave: "s892",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["surtigas"]
  },
  { 
    usuario: "gdo",
    nombre: "Gases de Occidente",
    clave: "g327",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["gdo"] 
  },
  { 
    usuario: "ceo",
    nombre: "Compañia Energetica de Occidente",
    clave: "c560",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-distribuidora"],
    permisosInformes: ["ceo"] 
  },
  { 
    usuario: "hdi",
    nombre: "HDI",
    clave: "235",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-aseguradora"],
    permisosInformes: ["hdi"] 
  },
  { 
    usuario: "alfa",
    nombre: "alfa",
    clave: "674",
    permisosSecciones: ["informe"],
    permisosGrupo: ["ejecucion-aseguradora"],
    permisosInformes: ["alfa"] 
  },
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