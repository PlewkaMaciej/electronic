import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({ baseURL });

const token = localStorage.getItem("accessToken");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
