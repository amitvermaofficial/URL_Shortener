import axios from "axios";
import dotenv from "dotenv";

dotenv.config('../.env');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export default instance;