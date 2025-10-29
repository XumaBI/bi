import * as React from "react";
import Grid from '../Grid';
import { GridColDef } from "@mui/x-data-grid";
import Selector from "../forms/Selector";
import { useState } from 'react';
import "../../css/Ejecucion.css"
import Boton from "../forms/Boton";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import "dayjs/locale/es";
import SelectorFecha from "../forms/SelectorFecha"

dayjs.locale("es");

// --- columnas y filas ---

const columnas: GridColDef[] = [
  { field: "movimiento", headerName: "Movimiento", width: 140 },
  { field: "origen", headerName: "Origen", width: 140 },
  { field: "porcentaje", headerName: "%", width: 50 },
  { field: "cant_registrada", headerName: "Cantidad Registrada", width: 140 },
  { field: "prima_registrada", headerName: "Prima Registrada", width: 140 },
  { field: "cantidad", headerName: "Cantidad", width: 100, editable: true },
  { field: "prima", headerName: "Prima", width: 140, editable: true },
  { field: "ebitda", headerName: "Ebitda", width: 140, editable: true },
];


const filas = [
  { id: 1, movimiento: "Venta Nueva", origen: "Canal Digital", porcentaje: 45, cant_registrada: 120, prima_registrada: 5600000 },
  { id: 2, movimiento: "Renovación", origen: "Fuerza de Ventas", porcentaje: 30, cant_registrada: 98, prima_registrada: 4200000 },
  { id: 3, movimiento: "Adición", origen: "Oficina Central", porcentaje: 20, cant_registrada: 76, prima_registrada: 3100000 },
  { id: 4, movimiento: "Cancelación", origen: "Canal Digital", porcentaje: 15, cant_registrada: 25, prima_registrada: 950000 },
  { id: 5, movimiento: "Venta Nueva", origen: "Aliado Externo", porcentaje: 50, cant_registrada: 140, prima_registrada: 6800000 },
  { id: 6, movimiento: "Renovación", origen: "Oficina Central", porcentaje: 25, cant_registrada: 85, prima_registrada: 3750000 },
  { id: 7, movimiento: "Adición", origen: "Canal Digital", porcentaje: 35, cant_registrada: 110, prima_registrada: 4900000 },
  { id: 8, movimiento: "Cancelación", origen: "Fuerza de Ventas", porcentaje: 10, cant_registrada: 15, prima_registrada: 600000 },
  { id: 9, movimiento: "Venta Nueva", origen: "Oficina Central", porcentaje: 40, cant_registrada: 130, prima_registrada: 6100000 },
  { id: 10, movimiento: "Renovación", origen: "Aliado Externo", porcentaje: 28, cant_registrada: 90, prima_registrada: 4050000 },
  { id: 11, movimiento: "Adición", origen: "Canal Digital", porcentaje: 32, cant_registrada: 100, prima_registrada: 4500000 },
  { id: 12, movimiento: "Cancelación", origen: "Oficina Central", porcentaje: 18, cant_registrada: 22, prima_registrada: 880000 },
  { id: 13, movimiento: "Venta Nueva", origen: "Fuerza de Ventas", porcentaje: 47, cant_registrada: 150, prima_registrada: 7000000 },
  { id: 14, movimiento: "Renovación", origen: "Canal Digital", porcentaje: 27, cant_registrada: 88, prima_registrada: 3900000 },
  { id: 15, movimiento: "Adición", origen: "Aliado Externo", porcentaje: 23, cant_registrada: 73, prima_registrada: 3200000 },
  { id: 16, movimiento: "Cancelación", origen: "Oficina Central", porcentaje: 12, cant_registrada: 18, prima_registrada: 720000 },
  { id: 17, movimiento: "Venta Nueva", origen: "Canal Digital", porcentaje: 49, cant_registrada: 160, prima_registrada: 7400000 },
  { id: 18, movimiento: "Renovación", origen: "Fuerza de Ventas", porcentaje: 29, cant_registrada: 95, prima_registrada: 4100000 },
  { id: 19, movimiento: "Adición", origen: "Oficina Central", porcentaje: 26, cant_registrada: 80, prima_registrada: 3600000 },
  { id: 20, movimiento: "Cancelación", origen: "Aliado Externo", porcentaje: 14, cant_registrada: 20, prima_registrada: 810000 }
];



export default function Ejecucion() {

    const opcionesGasera = [
    { value: "1", label: "GASES DEL CARIBE" },
    { value: "2", label: "GASES DE LA GUAJIRA" },
    { value: "3", label: "SURTIGAS" },
    { value: "4", label: "EFIGAS" },
    { value: "5", label: "GDO" },
    { value: "6", label: "CEO" },
  ];

      const opcionesAseguradora = [
    { value: "1", label: "ALFA" },
    { value: "2", label: "HDI" },
    { value: "3", label: "SURA" },
    { value: "4", label: "GNP" },
    { value: "5", label: "CAPILLAS LA FE" },
    { value: "6", label: "CARDIF" },
    { value: "7", label: "IKE" },
  ];

  const opcionesProducto = [
  { value: "001", label: "FUNERARIO" },
  { value: "002", label: "FUTURO PROTEGIDO" },
  { value: "003", label: "FUTURO PROTEGIDO PLUS PLAN 1" },
  { value: "004", label: "FUTURO PROTEGIDO PLUS PLAN 2" },
  { value: "005", label: "DOBLE CUPON (PROTECTOR)" },
  { value: "006", label: "DOBLE CUPON (PROTECCIÒN A SU MEDIDA)" },
  { value: "007", label: "DOBLE CUPON (EXEQUIA)" },
  { value: "008", label: "DOBLE CUPON (MI FAMILIA PROTEGIDA)" },
  { value: "009", label: "PRACTISEGURO" },
  { value: "010", label: "PRACTISEGURO PLUS" },
  { value: "011", label: "MASCOTAS" },
  { value: "012", label: "SALVA FACTURA" },
  { value: "013", label: "SEÑOR CASAS" },
  { value: "014", label: "PROEXEQUIAL" },
  { value: "015", label: "VIDA DEUDOR" },
  { value: "016", label: "FACTURA PROTEGIDA" },
  { value: "017", label: "IKE" },
];
  

const [gasera, setGasera] = useState("");
const [aseguradora, setAseguradora] = useState("");
const [producto, setProducto] = useState("");
const [fecha, setFecha] = React.useState(dayjs());


  return (
    <div style={{ color: "grey", padding: "50px 0px 100px 0px" }}>
      <h1>Integración de Sistemas</h1>
      <p>
        Aquí puedes mostrar componentes personalizados, tablas, formularios o
        cualquier otra funcionalidad interna.
      </p>

      <div className="grupofiltro">

        <div className="selectorGasera">
          <Selector
            label="Gasera"
            options={opcionesGasera}
            value={gasera}
            onChange={setGasera}
          />
        </div>

        <div className="selectorAseguradora">
          <Selector
            label="Aseguradora"
            options={opcionesAseguradora}
            value={aseguradora}
            onChange={setAseguradora}
          />
        </div>

        <div className="selectorProducto">
          <Selector
            label="Producto"
            options={opcionesProducto}
            value={producto}
            onChange={setProducto}
          />
        </div>

        <div className="selectorFecha">
          <SelectorFecha
            label="Fecha Movimiento"
            value={fecha}
            onChange={setFecha}
          />
        </div>
      </div>

      <div>
        <Grid 
        title="Cargue Ejecución"
        columns={columnas}
        apiUrl="http://localhost:8000/api/filas"
        data={filas}
        />
      </div>

      <div style={{ padding: "25px 15px", display: "flex", gap: "20px" }}>
      
      <Boton label="Guardar" icon={<SaveIcon />} color="success" />

      <Boton
        label="Cancelar"
        variant="contained"
        color="error"
        onClick={() => alert("Cancelado")}
      />
    </div>


    </div>
  )
};