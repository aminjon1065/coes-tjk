import axios from "axios";
import {BASE_URL} from "../constant";
export const apiRequest = axios.create({
    baseURL: `${BASE_URL}`
})
