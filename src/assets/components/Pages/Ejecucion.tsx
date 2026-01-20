import Grid from "../forms/Grid/Grid";
import Selector from "../forms/Selector";
import { useState, useMemo, useEffect } from "react";
import "../../css/Ejecucion.css";
import Boton from "../forms/Boton";
import SaveIcon from "@mui/icons-material/Save";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import SelectorFecha from "../forms/SelectorFecha";
import axios from "axios";

// --- Hooks API ---
import { useFetchData } from "../../api/hooks/useFetchData";
import { useFetchOnDemand } from "../../api/hooks/useFetchOnDemand";

dayjs.locale("es");

// ---- Interfaces ----
import {Distribuidora} from "../../utils/types/Distribuidora"
import {Aseguradora} from "../../utils/types/Aseguradora"
import {Producto} from "../../utils/types/Producto"
import {FilaEjecucion} from "../../utils/types/FilaEjecucion"

// ---- Columnas de tabla ----
import { columnas } from "../ejecucion/columnas";

// ---- Transformación de API → Filas tabla ----
function transformarRespuesta(data: any[] | undefined): FilaEjecucion[] {
  const filas: FilaEjecucion[] = [];
  if (!Array.isArray(data)) return filas;

  data.forEach((rel: any) => {
    (rel.movmaestro ?? []).forEach((mm: any) => {
      (mm.condiciones ?? []).forEach((cond: any) => {
        const movimientos = cond.movimientos ?? [];

        // Si no hay movimientos → fila "vacía" (id = condicion.id)
        if (movimientos.length === 0) {
          filas.push({
            id: cond.id,
            condicion_id: cond.id,
            movimiento: cond.movimiento?.tipo_movimiento ?? "N/A",
            porcentaje: `${((cond.por_retorno ?? 0) * 100).toFixed(2)}%`,
            cant_registrada: 0,
            prima_registrada: 0,
            cantidad: null,
            prima: null,
            ebitda: null,
          });
          return;
        }

        // Si tiene movimientos → fila por cada movimiento (id = movimiento.id)
        movimientos.forEach((mov: any) => {
          filas.push({
            id: mov.id,
            condicion_id: cond.id,
            movimiento: cond.movimiento?.tipo_movimiento ?? "N/A",
            porcentaje: `${((cond.por_retorno ?? 0) * 100).toFixed(2)}%`,
            cant_registrada: mov.cantidad ?? 0,
            prima_registrada: mov.valor ?? 0,
            cantidad: mov.cantidad ?? null,
            prima: mov.valor ?? null,
            ebitda: mov.valor_ebitda ?? null,
          });
        });
      });
    });
  });

  return filas;
}

export default function Ejecucion() {
  // ---- Selects ----
  const { data: distribuidoras = [] } = useFetchData<Distribuidora>("/distribuidora/");
  const opcionesGasera = distribuidoras.map((d) => ({ label: d.nombre, value: String(d.id) }));

  const { data: aseguradoras = [] } = useFetchData<Aseguradora>("/aseguradora/");
  const opcionesAseguradora = aseguradoras.map((a) => ({ label: a.nombre, value: String(a.id) }));

  const { data: productos = [] } = useFetchData<Producto>("/producto/");
  const opcionesProducto = productos.map((p) => ({ label: p.nombre, value: String(p.id) }));

  // ---- estados filtros ----
  const [distribuidora, setGasera] = useState<string>("");
  const [aseguradora, setAseguradora] = useState<string>("");
  const [producto, setProducto] = useState<string>("");
  const [fecha, setFecha] = useState<Dayjs>(dayjs());

  // ---- Construir endpoint ----
  const fechaStr = fecha ? fecha.set("date", 1).format("YYYY-MM-DD") : "";
  const endpoint =
    distribuidora && aseguradora && producto && fechaStr
      ? `/condiciones/filtrar?distribuidora=${distribuidora}&aseguradora=${aseguradora}&producto=${producto}&fecha=${fechaStr}`
      : "";

  // ---- Traer datos on-demand ----
  const { data: rawData, error } = useFetchOnDemand<any>(endpoint, [
    distribuidora,
    aseguradora,
    producto,
    fechaStr,
  ]);

  // ---- Filas transformadas ----
  const filas = useMemo(() => transformarRespuesta(rawData), [rawData]);

  // ---- guardamos copia original y editedRows ----
  const [originalRows, setOriginalRows] = useState<FilaEjecucion[]>([]);
  const [editedRows, setEditedRows] = useState<FilaEjecucion[]>([]);

  useEffect(() => {
    setOriginalRows(filas);
    setEditedRows(filas);
  }, [filas]);

  // ---- guardar cambios: detecta nuevos y modificados, hace POST/PUT ----
  async function guardarCambios() {
    try {
      const nuevos: any[] = [];
      const modificados: any[] = [];

      for (const row of editedRows) {
        // encontrar original por id; si no existe, original será undefined
        const original = originalRows.find((o) => o.id === row.id);

        const originalHadValues =
          !!original && (original.cantidad !== null || original.prima !== null || original.ebitda !== null);

        const nowHasValues = row.cantidad !== null || row.prima !== null || row.ebitda !== null;

        // Nuevo: antes vacío y ahora tiene algo
        if (!originalHadValues && nowHasValues) {
          nuevos.push({
            habilitado: true,
            cantidad: row.cantidad,
            valor: row.prima,
            valor_ebitda: row.ebitda,
            fecha: fechaStr ? `${fechaStr}T00:00:00` : new Date().toISOString(),
            id_condiciones: row.condicion_id,
          });
          continue;
        }

        // Modificación: antes tenía valores y ahora cambiaron
        if (originalHadValues) {
          const changed =
            original!.cantidad !== row.cantidad ||
            original!.prima !== row.prima ||
            original!.ebitda !== row.ebitda;

          if (changed) {
            modificados.push({
              id: row.id, // id movimiento existente
              habilitado: true,
              cantidad: row.cantidad,
              valor: row.prima,
              valor_ebitda: row.ebitda,
              fecha: fechaStr ? `${fechaStr}T00:00:00` : new Date().toISOString(),
              id_condiciones: row.condicion_id,
            });
          }
        }
      }

      // enviar peticiones
      const results: { created: any[]; updated: any[] } = { created: [], updated: [] };

      if (nuevos.length > 0) {
        const postPromises = nuevos.map((n) =>
          axios
            .post("http://localhost:8000/api/movimientos/", n)
            .then((r) => r.data)
            .catch((e) => ({ error: e }))
        );
        const created = await Promise.all(postPromises);
        results.created = created;
      }

      if (modificados.length > 0) {
        const putPromises = modificados.map((m) =>
          axios
            .put(`http://localhost:8000/api/movimientos/${m.id}`, m)
            .then((r) => r.data)
            .catch((e) => ({ error: e }))
        );
        const updated = await Promise.all(putPromises);
        results.updated = updated;
      }

      alert(`Guardado completo.\nCreados: ${results.created.length}\nActualizados: ${results.updated.length}`);

      // Actualizamos originalRows para que los cambios ya no se reenvíen
      setOriginalRows(editedRows);
    } catch (err) {
      console.error("Error guardando cambios:", err);
      alert("Error al guardar. Revisa la consola.");
    }
  }

  return (
    <div style={{ color: "grey", padding: "50px 0px 100px 0px" }}>
      <h1>Ingesta Ejecución</h1>
      <p>
        Aquí puedes ingresar, consultar y modificar los valores ejecutados al cierre para cada distribuidora,
        aseguradora y producto.
      </p>

      <div className="grupofiltro">
        <div className="selectorGasera">
          <Selector label="Gasera" options={opcionesGasera} value={distribuidora} onChange={setGasera} />
        </div>

        <div className="selectorAseguradora">
          <Selector label="Aseguradora" options={opcionesAseguradora} value={aseguradora} onChange={setAseguradora} />
        </div>

        <div className="selectorProducto">
          <Selector label="Producto" options={opcionesProducto} value={producto} onChange={setProducto} />
        </div>

        <div className="selectorFecha">
          <SelectorFecha label="Fecha Movimiento" value={fecha} onChange={setFecha} />
        </div>
      </div>

      {/* TABLA */}
      <div>
        <Grid
          title="Cargue Ejecución"
          columns={columnas}
          data={filas}
          onRowsUpdate={(rows) => {
            setEditedRows(rows as FilaEjecucion[]);
          }}
        />
      </div>

      {error && <p style={{ color: "red", marginTop: 8 }}>{String(error)}</p>}

      {/* BOTONES */}
      <div style={{ padding: "25px 15px", display: "flex", gap: "20px" }}>
        <Boton label="Guardar" icon={<SaveIcon />} color="success" onClick={guardarCambios} />
        <Boton label="Cancelar" variant="contained" color="error" onClick={() => alert("Cancelado")} />
      </div>
    </div>
  );
}



