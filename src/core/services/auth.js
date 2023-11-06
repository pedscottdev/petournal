import axiosClient from "./base.js";

const AuthService = {
    login: (user) => {
        return axiosClient.post("/auth/login", user);
    },
    register: (user) => {
        return axiosClient.post("/auth/register", user);
    },
    refreshToken: () => {
        return axiosClient.post("/auth/refresh-token");
    },
};


export default AuthService;