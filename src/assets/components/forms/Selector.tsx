import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface DropdownProps {
  label: string;                    // Título visible
  options: { value: string; label: string }[]; // Opciones
  value: string;                    // Valor seleccionado
  onChange: (value: string) => void; // Evento al cambiar
  disabled?: boolean;               // Opcional: desactivar dropdown
  fullWidth?: boolean;              // Opcional: ocupar todo el ancho
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  fullWidth = true,

}) => {
  return (
    <FormControl fullWidth={fullWidth} size="small" disabled={disabled}>
      <InputLabel 
      shrink
      sx={{ 
        color: "white",
        fontSize: "12px",
        }}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty // Necesario para mostrar el placeholder
        sx={{
          color: "white",
          borderColor: "white",
          "& .MuiSelect-select": { 
            fontSize: "12px",
            paddingTop: "5px",
            paddingBottom: "5px", 
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSvgIcon-root": { color: "white" },
          // 🔹 Esto afecta al menú desplegable
          "& .MuiPaper-root": { 
            backgroundColor: "#1e1e1e", // Fondo oscuro del menú
            color: "white", // Color del texto de las opciones
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "12px", // 🔹 tamaño del texto en las opciones
                paddingTop: "4px",
                paddingBottom: "4px",
              },
              "& .MuiList-root": {
                paddingTop: "4px",
                paddingBottom: "4px",
              },
              "& .MuiFormLabel-root": {
                fontSize: "5px"
              }
            },
          },
        }}
      >

        {/* 🔹 Placeholder */}
        <MenuItem value="">
          <em style={{ color: "gray" }}>Selecciona una opción</em>
        </MenuItem>

        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;