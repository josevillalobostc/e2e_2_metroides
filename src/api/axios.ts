import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const api = axios.create(
  {
    baseURL : api_url,
  }
)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
