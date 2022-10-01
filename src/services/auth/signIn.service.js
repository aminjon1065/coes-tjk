import {apiRequest} from "../../helper/apiRequest";

export const signInService = async (credentials) => {
    return await apiRequest.post('/login', credentials);
}