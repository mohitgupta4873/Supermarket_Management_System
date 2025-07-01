import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",  // Your Express backend
  withCredentials: true,             // Needed for sessions/cookies
});

export default api;
