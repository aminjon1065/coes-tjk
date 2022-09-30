import {apiRequest} from "../../helper/apiRequest";

export const isAuthService = (token) => {
    return apiRequest.get('isAuth', {
        headers: {Authorization: `Bearer ${token}`}
    })
}