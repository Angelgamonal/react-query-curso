import axios from "axios";

const API = "https://api.github.com/repos/facebook/react";

export const githubApi = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${String(import.meta.env.VITE_TOKEN_GITHUB)}`,
  },
});
