import axios from "axios";
import { API_URL } from "../constants/api";

const guestClient = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json" },
});

guestClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

guestClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error.response)
);

export default guestClient;
