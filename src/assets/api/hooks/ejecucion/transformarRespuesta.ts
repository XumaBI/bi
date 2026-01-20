import { FilaEjecucion } from "../../../utils/types/FilaEjecucion";
import { RawDataEjecucion } from "../../../utils/types/RawDataEjecucion";

export function transformarRespuesta(data: RawDataEjecucion[] | undefined): FilaEjecucion[] {
  const filas: FilaEjecucion[] = [];
  if (!Array.isArray(data)) return filas;

  data.forEach((rel) => {
    (rel.movmaestro ?? []).forEach((mm: any) => {
      (mm.condiciones ?? []).forEach((cond: any) => {
        const movimientos = cond.movimientos ?? [];

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
