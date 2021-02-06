import Axios from "axios";

export const BASE_URL = "http://localhost:8000/";

export const MyAxios = Axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  responseType: "json",
});
