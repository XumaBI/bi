import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./assets/css/index.css";

/*Buscamos y traemos el elemento html que contenga id=root desde index.html */
const rootElement = document.getElementById("root");

/*Se valida que el elemneto exista antes de continuar por dos motivos:
  1. evitar que la constante rootElement al tomar valor null (poco probable hasta que pasa)
    genere un error dificil de identificar en un proceso de Debugging 
  2. TypeScript infiere que rootElement puede ser HTMLElement | null.
  Se valida su existencia antes de usarlo porque createRoot no acepta valores null.*/

if (!rootElement) {
  throw new Error("Root element not found");
}

/*se le pasa al DOM el Elemento HTML donde seguidamente se rederizara el componente principal <App />*/
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
