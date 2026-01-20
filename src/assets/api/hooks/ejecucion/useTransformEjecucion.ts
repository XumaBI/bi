import { useMemo } from "react";
import { transformarRespuesta } from "./transformarRespuesta";
import { RawDataEjecucion } from "../../../utils/types/RawDataEjecucion";

export function useTransformEjecucion(RawDataEjecucion: RawDataEjecucion[]) {
  return useMemo(() => transformarRespuesta(RawDataEjecucion), [RawDataEjecucion]);
}