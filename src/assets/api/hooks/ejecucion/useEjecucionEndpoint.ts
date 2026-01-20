import { Dayjs } from "dayjs";

export function useEjecucionEndpoint(
    distribuidora: Number, 
    aseguradora: number, 
    producto: Number, 
    fecha: Dayjs | null) {
  const fechaStr = fecha ? fecha.set("date", 1).format("YYYY-MM-DD") : "";

  const endpoint =
    distribuidora && aseguradora && producto && fechaStr
      ? `/condiciones/filtrar?distribuidora=${distribuidora}&aseguradora=${aseguradora}&producto=${producto}&fecha=${fechaStr}`
      : "";

  return { endpoint, fechaStr };
}
