import Selector from "../forms/Selector";
import SelectorFecha from "../forms/SelectorFecha";
import { Dayjs } from "dayjs";

interface FiltrosEjecucionProps {
  distribuidora: number | null;
  setDistribuidora: (value: number | null) => void;

  aseguradora: number | null;
  setAseguradora: (value: number | null) => void;

  producto: number | null;
  setProducto: (value: number | null) => void;

  fecha: Dayjs | null;
  setFecha: (value: Dayjs | null) => void;

  opcionesGasera: { label: string; value: number }[];
  opcionesAseguradora: { label: string; value: number }[];
  opcionesProducto: { label: string; value: number }[];
}

export function FiltrosEjecucion({
  distribuidora, setDistribuidora,
  aseguradora, setAseguradora,
  producto, setProducto,
  fecha, setFecha,
  opcionesGasera,
  opcionesAseguradora,
  opcionesProducto
}: FiltrosEjecucionProps) {
  return (
    <div className="grupofiltro">
      <Selector
        label="Gasera"
        options={opcionesGasera}
        value={distribuidora}
        onChange={setDistribuidora}
      />
      <Selector
        label="Aseguradora"
        options={opcionesAseguradora}
        value={aseguradora}
        onChange={setAseguradora}
      />
      <Selector
        label="Producto"
        options={opcionesProducto}
        value={producto}
        onChange={setProducto}
      />
      <SelectorFecha
        label="Fecha Movimiento"
        value={fecha}
        onChange={setFecha}
      />
    </div>
  );
}

