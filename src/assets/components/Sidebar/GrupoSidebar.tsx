import { useState } from "react";
import { ItemSidebar } from "./ItemSidebar";

type GroupProps = {
  title: string;
  iconPath: string;
  informes: { name: string; path: string; type?: "informe" | "componente" }[];
  permisosInformes: string[];
};

export function GroupSidebar({
  title,
  iconPath,
  informes,
  permisosInformes,
}: GroupProps) {
  // 🔒 Cerrado por defecto
  const [open, setOpen] = useState(false);

  const informesFiltrados = informes.filter((i) =>
    permisosInformes.includes(i.path)
  );

  return (
    <div className="group">
      {/* --- Encabezado del grupo --- */}
      <div className="group-header" onClick={() => setOpen(!open)}>
        <div className="group-header-left">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d={iconPath}></path>
          </svg>
          <span>{title}</span>
        </div>
        {/* 🔽 Flecha dinámica */}
        <span className={`arrow ${open ? "open" : ""}`}>
          <svg viewBox="0 0 24 24"><path d="M8.59 7.41 13.17 12 8.59 16.59 10 18l6-6-6-6z"></path></svg>
        </span>
      </div>

      {/* --- Contenedor animado de los items --- */}
      <div
        className={`group-items ${open ? "open" : "closed"}`}
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {informesFiltrados.map((i) => (
          <ItemSidebar path={i.path} title={i.name} type={i.type} />
        ))}
      </div>
    </div>
  );
}

