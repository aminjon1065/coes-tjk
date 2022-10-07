import {apiRequest} from "../../helper/apiRequest";

export const isAuthService = async (token) => {
    return await apiRequest.get('/isAuth', {
        headers: {Authorization: `Bearer ${token}`}
    })
}