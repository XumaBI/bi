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
  "informe360": "https://app.powerbi.com/view?r=XXXXXX10",

  // Digital
  "digital-global": "https://app.powerbi.com/view?r=eyJrIjoiMzM2ZTM1NmMtOGUwZi00NDZlLWEyNGMtZjk3OGVhNjc1NDliIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "digital-caribe": "https://app.powerbi.com/view?r=eyJrIjoiYmZmZTM1MDgtODI3Mi00MjJmLWE1NTQtYWQ5M2ZlNDE2YThhIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "digital-efigas": "https://app.powerbi.com/view?r=eyJrIjoiZWQyYTcwZmItMjE4NC00ZGNhLWI0YTgtNDA2OTNiMTU5ZGIzIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "digital-gdo": "https://app.powerbi.com/view?r=eyJrIjoiZjQzMjcyZjEtM2JlNS00NDQyLWFlMjItODFmN2RiZDA5NTdkIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "digital-surtigas": "https://app.powerbi.com/view?r=eyJrIjoiOTczMmM1YjItMDVlMS00YTYzLTllZGUtMTQ3NmNmNzc0NGZmIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",

  //Ejecucion Comercial
  "comercial-caribe": "https://app.powerbi.com/view?r=eyJrIjoiNjhlYzMwNGUtMTVhZC00NzAyLTkwYmMtMjZlOWIzNGQ4OTA0IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "comercial-occidente": "https://app.powerbi.com/view?r=eyJrIjoiYzQ0MWJmMjItNTgzYS00ZGZkLWJlZjQtOTc4OWRhYmVmNzkwIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "comercial-efigas": "https://app.powerbi.com/view?r=eyJrIjoiNDA4ZTM4ODYtNmNkYS00MjI4LTgwMzQtMmI1ZTUyOTYzZDk5IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "comercial-ceo": "https://app.powerbi.com/view?r=eyJrIjoiYjNlZmYxNjgtMzZhNy00MTRhLWEyOGQtYTE2Nzk5MWRkNjMxIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9&disablecdnExpiration=1751404315",
  "comercial-surtigas": "https://app.powerbi.com/view?r=eyJrIjoiNjFiNDcxMmItNjAzZi00MGUzLWEyZmEtZThmZDRkODg2YjQ0IiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9&disablecdnExpiration=1751404315",

  "comercial-hdi": "https://app.powerbi.com/view?r=eyJrIjoiNzljY2UzZWUtNzRjOC00Y2MwLTlmMmMtNzdkMzk2YTg4MTVmIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "comercial-alfa": "https://app.powerbi.com/view?r=eyJrIjoiNGNmMWNkNWYtMjRiNC00Njc2LWJiNDAtYzUzNDQ4Y2Y2ZDRkIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9",
  "comercial-ike": "https://app.powerbi.com/view?r=eyJrIjoiMjMwMGRhY2ItZTU5Yy00MmYxLWFmZTEtNWVkMGQ5ZWQyYzhkIiwidCI6ImEzNmEzYmJkLTY5ZGQtNDgzNS04NTIyLTRiOTQ0MmM5YTE3NCIsImMiOjR9"
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