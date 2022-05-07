import axios from "axios";

export const axiosInst = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 5000,
  headers: {}
});