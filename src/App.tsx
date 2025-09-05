import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Informe from "./pages/Informe";

import "./App.css";

function App() {
  const [usuario, setUsuario] = useState<string | null>(null);

  return (
    <div id="container-app" className="App">
      {!usuario ? (
        <Login alIniciarSesion={(nombre) => setUsuario(nombre)} />
      ) : (
        <>
          <Sidebar />
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
