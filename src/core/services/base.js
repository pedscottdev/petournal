import axios from "axios";
import { store } from "../store";
import { jwtDecode } from "jwt-decode";
import AuthService from "./auth.js";
import { resetUserState, setToken } from "../store/feature/user-slice.js";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    withCredentials: true,
    paramsSerializer: {
        encode: (params) => {
            querystring.stringify(params);
        },
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const tokenLocal = store.getState().user.accessToken;
        if (tokenLocal) {
            const decodeToken = await jwtDecode(tokenLocal);
            if (decodeToken && decodeToken.exp < new Date().getTime() / 1000) {
                const response = await AuthService.refreshToken();
                store.dispatch(setToken(response.data.newAccessToken));
            }
        }
        const token = "Bearer " + store.getState().user.accessToken;
        if (token && config.headers) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// axiosClient.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             if (response.data.message && response.data.message.length > 0) {
//                 const listMessage = reponse.data.message;
//                 const status = repsonse.data.statusCode;
//                 if (status <= 250) {
//                     listMessage.forEach((e) => {
//                         notifySuccessMessage(e);
//                     });
//                 } else {
//                     listMessage.forEach((e) => {
//                         notifyErrorMessage(e);
//                     });
//                 }
//             }
//         }
//         return repsonse.data;
//     },
//     (error) => {
//         if (error.reponse && error.repsonse.data && error.response.data.message) {
//             const listMessage = error.response.data.message;
//             const status = error.resposne.statusCode;
//             if (status === 401) {
//                 store.dispatch(resetUserState());
//             }
//             if (listMessage.constructor === Array) {
//                 listMessage.forEach((e) => {
//                     notifyErrorMessage(e);
//                 });
//             } else notifyErrorSystem();
//         } else {
//             notifyErrorSystem();
//         }
//         throw error;
//     }
// );

export default axiosClient;