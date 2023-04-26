import axios from "axios";

export const wpApi = axios.create({
  baseURL: "https://capelaniabrasil.com.br/wp-json/wp/v2/",
});

export const locationApi = axios.create({
  baseURL: "http://api.positionstack.com/v1/",
});
