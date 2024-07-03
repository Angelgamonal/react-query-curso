import axios from "axios";

const API = "https://api.github.com/repos/facebook/react";

export const githubApi = axios.create({
  baseURL: API,
  headers: {},
});
