import {apiRequest} from "../../helper/apiRequest";

export const signUpService = async (credentials) => {
    console.log(credentials)
    return await apiRequest.post('/register', credentials, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}