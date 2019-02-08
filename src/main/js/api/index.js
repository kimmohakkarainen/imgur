import axios from "axios";

const API_BASE_URL = "https://api.imgur.com/3";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Client-ID 47fff0e67349725"
  }
});

export function getViral(params) {
  return client.get("/gallery/hot/viral/0.json");
}

const LOCAL_BASE_URL = "";

const localClient = axios.create({
  baseURL: LOCAL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Client-ID 47fff0e67349725"
  }
});

export function postMetadata(params) {
  return localClient.post("/rest/metadata", params);
}
