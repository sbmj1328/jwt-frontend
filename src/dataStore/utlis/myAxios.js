import Axios from "axios";

export const BASE_URL = "http://api-prism.digiapt.com/api/v1/";

export const MyAxios = Axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
  },
  responseType: "json",
});
