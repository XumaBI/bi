import { useParams } from "react-router-dom";
import "../css/Login.css";

const informes: Record<string, string> = {
  // Ejecucion Global
  "ejecucion-promigas": "https://app.powerbi.com/view?r=eyJrIjoiYjQ5ZjQyYWEtZGEyMS00NTE1LWI4YmMtYTk3ZGY2NDdiN2RmIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "ejecucion-parcial": "https://app.powerbi.com/view?r=eyJrIjoiNWY3OWNjZDEtZDI4YS00OGQ2LWI2MmQtNjdmZmNmMjQyNDUwIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "controladas":  "https://app.powerbi.com/view?r=eyJrIjoiNjJmMTFkZjQtOTNlMC00NTgzLWE0MDktMTljYzIwYjliNDRlIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "relacionadas": "https://app.powerbi.com/view?r=eyJrIjoiOTVkYTVmODAtNDZmYy00NTZhLWFlYmMtZGU5NGZlNDg4NmVlIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
   
  // Ejecucion Distribuidoras
  "caribe": "https://app.powerbi.com/view?r=eyJrIjoiZmI3ZmRhZGItNTIxNy00MWM4LTk5ZTYtNmQxMmE5NGQ0ZTg4IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "guajira": "https://app.powerbi.com/view?r=eyJrIjoiZDlkYWFmMGMtNjEyOC00NjZlLThjZmMtYzk1N2NjODYxNzY2IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "efigas": "https://app.powerbi.com/view?r=eyJrIjoiNTE4ODcxMTQtODZkNS00NjY4LWEzY2UtZjlmNGM0MDQ0NmM5IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "surtigas": "https://app.powerbi.com/view?r=eyJrIjoiODEzNTI1NmItMTZiYi00YjUwLTk2NDQtMDgxMjA1YmE0ZWRhIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "gdo": "https://app.powerbi.com/view?r=eyJrIjoiMWUyNGYwNzgtZThkOS00NzJiLWI1NDktN2JjOWYzODY4MTNkIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "ceo": "https://app.powerbi.com/view?r=eyJrIjoiNGRiNWFjMTAtNzYxZS00ZWFiLWIyYWQtNWVjOTM1ZGNlYzFhIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",

  // Ejecucion Aseguradoras
  "hdi": "https://app.powerbi.com/view?r=eyJrIjoiZTFjODIyY2MtNTA3ZC00ZWNlLWJlNmYtMWVjMDkyMmU2ZDIzIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "alfa": "https://app.powerbi.com/view?r=eyJrIjoiNjg4ZTQ4ZTktODljMS00ODg5LWE5MmQtNGJlOWMwNDRiYTczIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",

  // Revisión
  "revision-ejecucion": "https://app.powerbi.com/view?r=eyJrIjoiNGQ1MzcxMDYtMDg5ZC00ZGNhLTg5ZDAtYzJjZjhiNTg5YzVlIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "revision-cargue": "https://app.powerbi.com/view?r=eyJrIjoiOWNiNzNlYmEtNGNiZC00OWViLTllODEtZDU1NDZmYTJjOTIwIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",

  // Comercial
  "informe-cargues": "https://app.powerbi.com/view?r=eyJrIjoiZDJhNjJmMmUtOWI1OC00YzE3LTljMzYtYjMxNmRiZjQyN2RjIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "informe360": "https://app.powerbi.com/view?r=XXXXXX10"
};

function Informe() {
  const { id } = useParams<{ id: string }>();
  const url = id ? informes[id] : null;

  if (!url) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Informe no encontrado</h2>;
  }

  return (
    <div className="iframe">
      <iframe
        title={id}
        src={url}
      />
    </div>
  );
}

export default Informe;