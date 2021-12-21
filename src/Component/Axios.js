import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 60000,
  headers: {
    Accept: "aplication/json",
    "Content-type": "aplication/json",
  },
});
