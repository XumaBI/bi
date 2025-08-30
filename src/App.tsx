import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import EjecucionPromigas from "./pages/EjecucionPromigas";
import Caribe from "./pages/Caribe";

import "./App.css";

function App() {
  return (
    <div id="container-app" className="App">
      <Sidebar />

      <div id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ejecucion-promigas" element={<EjecucionPromigas />} />
          <Route path="/caribe" element={<Caribe />} />
          {/* Agrega aquí las demás rutas: Guajira, Efigas, Surtigas, GDO, CEO, HDI, ALFA, Revision, etc. */}
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
