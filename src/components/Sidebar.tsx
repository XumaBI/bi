import { useState } from "react";
import Section from './SectionSidebar'
import './sidebar.css'
import { Link } from "react-router-dom";

function Sidebar() {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className={`sidebar ${isClosed ? "closed" : ""}`}>
      <div className="sidebar-header">
        <Link to="/">
          <img 
            src="/xuma-blanco.svg" 
            alt="Logo" 
            className={`logoSidebar ${isClosed ? "logoSidebarClosed" : ""}`} 
          />
        </Link>
        <button 
          className={`close-btn ${isClosed ? "closed-btn" : ""}`} 
          onClick={() => setIsClosed(prev => !prev)} 
          title="Expandir/Contraer"
        >
          <svg>
            <path d="M1.8 1 0 2.8v10.4L1.8 15h12.4l1.8-1.8V2.8L14.2 1zm4.805 12.2V2.8H14.2v10.4zm-1.8-10.4H1.8v10.4h3.005z"></path>
          </svg>
        </button>
      </div>
      <h4 className="sidebar-title">Informes</h4>
      <div className="sidebar-content">
        <Section 
          title="Ejecución Global" 
          icon="fas fa-globe" 
          isClosed={isClosed}
          links={[
            { name: "Ejecucion Promigas", path: "/informe/ejecucion-promigas" },
            { name: "Ejecucion Parcial", path: "/informe/ejecucion-parcial" },
            { name: "Ejecucion Controladas", path: "/informe/controladas" },
            { name: "Ejecucion Relacionadas", path: "/informe/relacionadas" }
          ]}
        />
        <Section 
          title="Ejecución Distribuidora" 
          icon="fas fa-sitemap"
          isClosed={isClosed} 
          links={[
            { name: "Caribe", path: "/informe/caribe" },
            { name: "Guajira", path: "/informe/guajira" },
            { name: "Efigas", path: "/informe/efigas" },
            { name: "Surtigas", path: "/informe/surtigas" },
            { name: "GDO", path: "/informe/gdo" },
            { name: "CEO", path: "/informe/ceo" },
          ]}
        />
        <Section 
          title="Ejecución Aseguradora" 
          icon="fas fa-building"
          isClosed={isClosed} 
          links={[
            { name: "HDI", path: "/informe/hdi" },
            { name: "ALFA", path: "/informe/alfa" },
          ]}
        />
        <Section 
          title="Revisión" 
          icon="fas fa-clipboard-check"
          isClosed={isClosed} 
          links={[
            { name: "Revisión", path: "/informe/revision-ejecucion" },
            { name: "Revisión", path: "/informe/revision-cargue" }
          ]}
        />
        <Section 
          title="Comercial" 
          icon="fas fa-solid fa-marker"
          isClosed={isClosed} 
          links={[
            { name: "Informe de Cargues", path: "/informe/informe-cargues" },
            { name: "Informe 360", path: "/informe/informe360" }
          ]}
        />
      </div>
    </div>
  );
}

export default Sidebar;