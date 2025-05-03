export const { VITE_API_URL, VITE_API_URL_PROD, VITE_NODE_ENV } = import.meta
  .env;

export const API_URL =
  VITE_NODE_ENV === "production" ? VITE_API_URL_PROD : VITE_API_URL;
