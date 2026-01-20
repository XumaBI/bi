import axios from "axios";

// Aquí se define una única base URL para todas las peticiones
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // cambia según el backend
});

export default apiClient;