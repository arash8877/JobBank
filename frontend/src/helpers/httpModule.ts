import axios from "axios";
import { BASE_URL } from "../constants/urlConstant";

const httpModule = axios.create({
  baseURL: BASE_URL,
});

export default httpModule;
