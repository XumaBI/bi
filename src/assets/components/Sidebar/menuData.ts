export type Informe = {
  name: string;
  path: string;
  type: "informe" | "componente";
};

export type Grupo = {
  name: string;
  iconPath: string;
  path: string;
  type?: "informe" | "componente"; // opcional: solo algunos grupos la usan
  informes: Informe[];
};

export type Seccion = {
  name: string;
  iconPath: string;
  path: string;
  grupos: Grupo[];
};

export const MENU_DATA: Seccion[] = [
  // 🔹 SECCIÓN INFORMES
  {
    name: "Informes",
    iconPath: "M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z",
    path: "/informe",
    grupos: [
      {
        name: "Ejecución Global",
        iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z",
        path: "ejecucion-global",
        informes: [
          { name: "Ejecución Promigas", path: "ejecucion-promigas", type: "informe" },
          { name: "Ejecución Parcial", path: "ejecucion-parcial", type: "informe" },
          { name: "Ejecución Controladas", path: "controladas", type: "informe" },
          { name: "Ejecución Relacionadas", path: "relacionadas", type: "informe" },
        ],
      },
      {
        name: "Ejecución Distribuidora",
        iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z",
        path: "ejecucion-distribuidora",
        informes: [
          { name: "Caribe", path: "caribe", type: "informe" },
          { name: "Guajira", path: "guajira", type: "informe" },
          { name: "Efigas", path: "efigas", type: "informe" },
          { name: "Surtigas", path: "surtigas", type: "informe" },
          { name: "GDO", path: "gdo", type: "informe" },
          { name: "CEO", path: "ceo", type: "informe" },
        ],
      },
      {
        name: "Ejecución Aseguradora",
        iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z",
        path: "ejecucion-aseguradora",
        informes: [
          { name: "HDI", path: "hdi", type: "informe" },
          { name: "ALFA", path: "alfa", type: "informe" },
        ],
      },
      {
        name: "Revisión",
        iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z",
        path: "revision",
        type: "informe",
        informes: [
          { name: "Revisión Ejecución", path: "revision-ejecucion", type: "informe" },
          { name: "Revisión Cargue", path: "revision-cargue", type: "informe" },
        ],
      },
      {
        name: "Comercial",
        iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z",
        path: "comercial",
        informes: [
          { name: "Informe de Cargues", path: "informe-cargues", type: "informe" },
          { name: "Informe 360°", path: "informe360", type: "informe" },
        ],
      },
    ],
  },

  // 🔹 SECCIÓN INTEGRACIÓN
  {
    name: "Integración",
    iconPath: "m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27z",
    path: "/integracion",
    grupos: [
      {
        name: "Operaciones",
        iconPath: "M6 6h12v12H6z",
        path: "Modulo-Operaciones",
        type: "componente",
        informes: [
          { name: "Ejecución", path: "ejecucion", type: "componente" },
          { name: "Revisión", path: "revision", type: "componente" },
          { name: "Condiciones", path: "condiciones", type: "componente" },
          { name: "Activos", path: "activos", type: "componente" },
          { name: "Tramitado", path: "tramitado", type: "componente" },
        ],
      },
    ],
  },
];

