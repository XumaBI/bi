import { GridColDef } from "@mui/x-data-grid";
import { NumericEditInput } from "../forms/Grid/NumericEditInput";

export const columnas: GridColDef[] = [
  { field: "movimiento", headerName: "Movimiento", flex: 1, align: "right", headerAlign: "right"},
  { field: "porcentaje", headerName: "%" , flex: 0.5 },
  { field: "cantidad", headerName: "Cantidad", editable: true, flex: 0.7, align: "right", renderEditCell: NumericEditInput},
  { field: "prima", headerName: "Prima", editable: true, flex: 1, align: "right"},
  { field: "ebitda", headerName: "Ebitda", editable: true, flex: 1, align: "right" },
];
