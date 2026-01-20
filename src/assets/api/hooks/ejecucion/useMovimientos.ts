import axios from "axios";

export interface MovimientoRow {
  id?: number;
  cantidad: number | null;
  prima: number | null;
  ebitda: number | null;
  condicion_id: number;
}

export interface MovimientoPayload {
  id?: number;
  habilitado: boolean;
  cantidad: number | null;
  valor: number | null;
  valor_ebitda: number | null;
  fecha: string;
  id_condiciones: number;
}

export function useMovimientos(fechaStr: string) {
  async function guardarCambios(
    originalRows: MovimientoRow[],
    editedRows: MovimientoRow[]
  ): Promise<{ created: MovimientoPayload[]; updated: MovimientoPayload[] }> {
    const nuevos: MovimientoPayload[] = [];
    const modificados: MovimientoPayload[] = [];

    for (const row of editedRows) {
      const original = originalRows.find(o => o.id === row.id);

      const originalHadValues =
        !!original &&
        (original.cantidad !== null ||
          original.prima !== null ||
          original.ebitda !== null);

      const nowHasValues =
        row.cantidad !== null ||
        row.prima !== null ||
        row.ebitda !== null;

      // --- Caso creación ---
      if (!originalHadValues && nowHasValues) {
        nuevos.push({
          habilitado: true,
          cantidad: row.cantidad,
          valor: row.prima,
          valor_ebitda: row.ebitda,
          fecha: `${fechaStr}T00:00:00`,
          id_condiciones: row.condicion_id
        });
        continue;
      }

      // --- Caso modificación ---
      if (originalHadValues) {
        const changed =
          original.cantidad !== row.cantidad ||
          original.prima !== row.prima ||
          original.ebitda !== row.ebitda;

        if (changed) {
          modificados.push({
            id: row.id,
            habilitado: true,
            cantidad: row.cantidad,
            valor: row.prima,
            valor_ebitda: row.ebitda,
            fecha: `${fechaStr}T00:00:00`,
            id_condiciones: row.condicion_id
          });
        }
      }
    }

    // Aquí tipamos results para evitar never[]
    const results: {
      created: MovimientoPayload[];
      updated: MovimientoPayload[];
    } = { created: [], updated: [] };

    // --- POST: nuevos ---
    if (nuevos.length > 0) {
      results.created = await Promise.all(
        nuevos.map(n =>
          axios.post("/api/movimientos/", n).then(r => r.data)
        )
      );
    }

    // --- PUT: modificados ---
    if (modificados.length > 0) {
      results.updated = await Promise.all(
        modificados.map(m =>
          axios.put(`/api/movimientos/${m.id}`, m).then(r => r.data)
        )
      );
    }

    return results;
  }

  return { guardarCambios };
}

