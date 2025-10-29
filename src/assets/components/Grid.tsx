import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useEffect } from "react";
import axios from "axios";
import GlobalStyles from "@mui/material/GlobalStyles"; //usado para insertar estilos generales a todos los elementos del componente

import { esES } from "@mui/x-data-grid/locales";

import {
  DataGrid,
  GridColDef,
  Toolbar,
  ToolbarButton,
  ExportCsv,
  ExportPrint,
  QuickFilter,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear,
} from "@mui/x-data-grid";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";


// --- estilos del QuickFilter (fixes para crecimiento) ---
const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
  marginLeft: "auto",

  // <- definimos el ancho del trigger contraído para evitar crecimiento indefinido
  "--trigger-width": "40px",

  // evita que el grid fuerce el crecimiento del contenedor
  minWidth: 0,
});

const StyledTextField = styled(TextField)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    gridArea: "1 / 1",
    overflowX: "clip",

    // usa la variable y asegura límites para que no obligue al contenedor a expandirse
    width: expanded ? 260 : "var(--trigger-width)",
    minWidth: 0,
    maxWidth: "100%",
    boxSizing: "border-box",

    opacity: expanded ? 1 : 0,
    transition: theme.transitions.create(["width", "opacity"]),
  })
);

// --- Toolbar personalizada ---
function CustomToolbar() {
  return (
    <Toolbar
    >
      <Tooltip title="Descargar CSV">
        <ExportCsv render={<ToolbarButton />}>
          <FileDownloadIcon fontSize="small" />
        </ExportCsv>
      </Tooltip>

      <Tooltip title="Imprimir">
        <ExportPrint render={<ToolbarButton />}>
          <PrintIcon fontSize="small" />
        </ExportPrint>
      </Tooltip>

      <StyledQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => {
            const { ref, ...rest } = triggerProps as {
              ref?: React.Ref<HTMLButtonElement>;
            } & Record<string, any>;

            return (
              <Tooltip title="Buscar">
                <Box
                  sx={{
                    gridArea: "1 / 1",
                    zIndex: 1,
                    opacity: state.expanded ? 0 : 1,
                    pointerEvents: state.expanded ? "none" : "auto",
                    transition: (theme) => theme.transitions.create("opacity"),
                  }}
                >
                  <ToolbarButton
                    {...(rest as Record<string, any>)}
                    ref={ref as React.Ref<HTMLButtonElement>}
                    color="default"
                    aria-disabled={state.expanded}
                  >
                    <SearchIcon fontSize="small" />
                  </ToolbarButton>
                </Box>
              </Tooltip>
            );
          }}
        />

        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledTextField
              {...(controlProps as Record<string, any>)}
              expanded={state.expanded}
              inputRef={ref as React.Ref<HTMLInputElement>}
              aria-label="Buscar"
              placeholder="Buscar..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Limpiar búsqueda"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...(controlProps.slotProps?.input ?? {}),
                },
                ...(controlProps.slotProps ?? {}),
              }}
            />
          )}
        />
      </StyledQuickFilter>
    </Toolbar>
  );
}

// --- Tema oscuro global ---
const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      background: {
        default: "rgba(0, 0, 0, 0)",
        paper: "rgba(12, 16, 23, 1)",
      },
      text: {
        primary: "#e4e4e4ff",
      },
    },
  },
  esES
);

// INTERFAZ DE PROPS
interface CustomGridProps {
  title?: string; // opcional
  columns: GridColDef[];
  apiUrl?: string; // opcional
  data?: any[]; // opcional: si no se usa API
}

// --- Componente principal ---
export default function Grid({ title, columns, apiUrl, data }: CustomGridProps) {
  const [rows, setRows] = useState<any[]>(data || []);
  const [loading, setLoading] = useState(false);

    // Cargar datos desde la API
  useEffect(() => {
    if (!apiUrl) return;
    setLoading(true);
    axios
      .get<any[]>(apiUrl)
      .then((res: any) => setRows(res.data))
      .catch((err: unknown) => console.error("Error al cargar los datos:", err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={(theme: any) => ({
          // el panel del DataGrid (se renderiza en portal)
          ".MuiDataGrid-panel, .MuiDataGrid-paper, .MuiDataGrid-panelContent, .MuiDataGrid-panelWrapper": {
            color: `${theme.palette.text.primary} !important`,
            backgroundColor: "rgba(21, 28, 39, 1) !important",
          },

          // textos y labels dentro del panel
          ".MuiDataGrid-panel .MuiTypography-root, .MuiDataGrid-panel .MuiFormControlLabel-label, .MuiDataGrid-panel .MuiButton-root": {
            color: `${theme.palette.text.primary} !important`,
            fontSize: "12px !important",
          },

          // inputs y placeholder
          ".MuiDataGrid-panel .MuiInputBase-input": {
            color: `${theme.palette.text.primary} !important`,
          },
          ".MuiDataGrid-panel input::placeholder": {
            color: "rgba(228,228,228,0.7) !important",
            opacity: 1,

          },
          // el span que contiene el texto (MuiTypography dentro de ListItemText)
          ".MuiDataGrid-menu .MuiListItemText-root .MuiTypography-root": {
            fontSize: "12px !important",
            lineHeight: 1.4,
          },
        })}
      />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "background.default",

          // defensas contra crecimiento indefinido del contenido
          minWidth: 0,
          overflow: "hidden", // usa overflowX: "auto" si quieres scroll horizontal
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ color: "white", margin: 0, marginBottom: 12 }}>
          {title}
        </h2>

        <DataGrid
          rows={rows}
          rowHeight={40}
          columns={columns}
          loading={loading}
          columnHeaderHeight={45}
          localeText={{
            ...esES.components.MuiDataGrid.defaultProps.localeText,
            paginationRowsPerPage: "Filas por página:",
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pageSizeOptions={[10, 50, 100]}
          slots={{ toolbar: CustomToolbar }}
          showToolbar
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            border: "none",
            minWidth: 0,
            // evita que las celdas obliguen a crecer el contenedor
            "& .MuiDataGrid-virtualScroller": {
              minWidth: 0,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(255, 255, 255, 0)",
              minWidth: 0,
            },
            "& .MuiDataGrid-mainContent": {
              borderRadius: 3,
              border: "1px solid rgba(102, 102, 102, 1)",
              fontSize: "12px",
            },
            "& .MuiDataGrid-toolbarContainer": {
              minHeight: "45px", // 👈 alto del toolbar
            },
            "& .MuiDataGrid-toolbar": {
              backgroundColor: "rgba(16, 19, 24, 1)",
              minWidth: 0,
              border: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "rgba(16, 19, 24, 1)",
            },
            "& .MuiTablePagination-root": {
              fontSize: "12px", // 👈 cambia el tamaño de letra del texto del footer
              color: "#e4e4e4ff", // 👈 color del texto
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "12px", // 👈 aplica también al texto "Filas por página" y "1–10 de X"
            },
            "& .MuiTablePagination-actions button": {
              color: "#e4e4e4ff", // 👈 color de los íconos de navegación
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}


