import axiosClient from "./base.js";

const AuthService = {
    login: (user) => {
        return axiosClient.post("/auth/login", user);
    },
    register: (user) => {
        return axiosClient.post("/auth/register", user);
    },
    updatePassword: (body) => {
        return axiosClient.post("/auth/updatePassword", body);
    },
    refreshToken: () => {
        return axiosClient.post("/auth/refresh-token");
    },
    sendMailResetPassword: (body) => {
        return axiosClient.post("/auth/sendMailResetPassword", body);
    },
    logout: () => {
        return axiosClient.post("auth/logout");
    },
};

export default AuthService;
