import Grid from "../forms/Grid/Grid";
import { columnas } from "./columnas";
import { FilaEjecucion } from "../../utils/types/FilaEjecucion";

interface TablaEjecucionProps {
  filas: FilaEjecucion[];
  onUpdate: (rows: FilaEjecucion[]) => void;
}

export function TablaEjecucion({ filas, onUpdate }: TablaEjecucionProps) {
  return (
    <Grid
      title="Cargue Ejecución"
      columns={columnas}
      data={filas}
      onRowsUpdate={(rows) => onUpdate(rows)}
    />
  );
}
