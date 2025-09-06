import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Informe from "./pages/Informe";

import "./App.css";

// Define el tipo Usuario igual que en Login.tsx
type Usuario = {
  nombre: string;
  clave: string;
  permisos: string[];
};

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <div id="container-app" className="App">
      {!usuario ? (
        <Login alIniciarSesion={(usuario) => setUsuario(usuario)} /> 
      ) : (
        <>
          <Sidebar permisos={usuario.permisos} />

          <div id="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/informe/:id" element={<Informe />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
