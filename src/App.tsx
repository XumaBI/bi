import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./assets/components/Sidebar/Sidebar";
import Login from "./assets/components/Login";
import Home from "./assets/components/Home";
import Informe from "./assets/components/Informe";
import { Header } from "./assets/components/Header";
import { IntegracionPage } from "./assets/components/IntegracionPages";

import { AuthContext } from "./context/AuthContext";
import type { Usuario } from "./context/AuthContext";

import "./assets/css/App.css";

export function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario }}>
      <div className="container-app">

        {!usuario ? (
          <Login alIniciarSesion={(usuario) => setUsuario(usuario)} />
        ) : (
          <>
            <Header
              userName={usuario.usuario}
              nombre={usuario.nombre}
              onLogout={handleLogout}
              isClosed={isClosed}
              onToggleSidebar={() => setIsClosed(!isClosed)}
            />

            <div className="body-app">
              <Sidebar
                permisosSecciones={usuario.permisosSecciones}
                permisosGrupo={usuario.permisosGrupo}
                permisosInformes={usuario.permisosInformes}
                isClosed={isClosed}
                onExpandir={() => setIsClosed(false)}
              />

              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/informe/:id" element={<Informe />} />

                  {/* Componentes propios */}
                  <Route
                    path="/componente/Ejecucion"
                    element={<IntegracionPage />}
                  />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}

