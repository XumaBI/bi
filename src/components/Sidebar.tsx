import { useState } from "react";
import Section from "./SectionSidebar";
import "./sidebar.css";
import { Link } from "react-router-dom";

type SidebarProps = {
  permisos: string[];
};

function Sidebar({ permisos }: SidebarProps) {
  const [isClosed, setIsClosed] = useState(false);

  // función auxiliar para filtrar links según permisos
  const filtrarLinks = (links: { name: string; path: string }[]) => {
    return links.filter((link) =>
      permisos.includes(link.path.split("/").pop() || "")
    );
  };

  // Definición de secciones con sus links filtrados
  const globalLinks = filtrarLinks([
    { name: "Ejecucion Promigas", path: "/informe/ejecucion-promigas" },
    { name: "Ejecucion Parcial", path: "/informe/ejecucion-parcial" },
    { name: "Ejecucion Controladas", path: "/informe/controladas" },
    { name: "Ejecucion Relacionadas", path: "/informe/relacionadas" },
  ]);

  const distribuidoraLinks = filtrarLinks([
    { name: "Caribe", path: "/informe/caribe" },
    { name: "Guajira", path: "/informe/guajira" },
    { name: "Efigas", path: "/informe/efigas" },
    { name: "Surtigas", path: "/informe/surtigas" },
    { name: "GDO", path: "/informe/gdo" },
    { name: "CEO", path: "/informe/ceo" },
  ]);

  const aseguradoraLinks = filtrarLinks([
    { name: "HDI", path: "/informe/hdi" },
    { name: "ALFA", path: "/informe/alfa" },
  ]);

  const revisionLinks = filtrarLinks([
    { name: "Revisión Ejecución", path: "/informe/revision-ejecucion" },
    { name: "Revisión Cargue", path: "/informe/revision-cargue" },
  ]);

  const comercialLinks = filtrarLinks([
    { name: "Informe de Cargues", path: "/informe/informe-cargues" },
    { name: "Informe 360", path: "/informe/informe360" },
  ]);

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
          onClick={() => setIsClosed((prev) => !prev)}
          title="Expandir/Contraer"
        >
          <svg>
            <path d="M1.8 1 0 2.8v10.4L1.8 15h12.4l1.8-1.8V2.8L14.2 1zm4.805 12.2V2.8H14.2v10.4zm-1.8-10.4H1.8v10.4h3.005z"></path>
          </svg>
        </button>
      </div>
      <h4 className="sidebar-title">Informes</h4>
      <div className="sidebar-content">
        {globalLinks.length > 0 && (
          <Section
            title="Ejecución Global"
            icon="fas fa-globe"
            isClosed={isClosed}
            links={globalLinks}
          />
        )}

        {distribuidoraLinks.length > 0 && (
          <Section
            title="Ejecución Distribuidora"
            icon="fas fa-sitemap"
            isClosed={isClosed}
            links={distribuidoraLinks}
          />
        )}

        {aseguradoraLinks.length > 0 && (
          <Section
            title="Ejecución Aseguradora"
            icon="fas fa-building"
            isClosed={isClosed}
            links={aseguradoraLinks}
          />
        )}

        {revisionLinks.length > 0 && (
          <Section
            title="Revisión"
            icon="fas fa-clipboard-check"
            isClosed={isClosed}
            links={revisionLinks}
          />
        )}

        {comercialLinks.length > 0 && (
          <Section
            title="Comercial"
            icon="fas fa-solid fa-marker"
            isClosed={isClosed}
            links={comercialLinks}
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
