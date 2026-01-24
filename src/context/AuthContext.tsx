import { createContext } from "react";

export type Usuario = {
  nombre: string;
  usuario: string;
  clave: string;
  permisosSecciones: string[];
  permisosGrupo: string[];
  permisosInformes: string[];
};

type AuthContextType = {
  usuario: Usuario | null;
};

export const AuthContext = createContext<AuthContextType>({
  usuario: null
});
