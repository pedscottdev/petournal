import axiosClient from "./base.js";

const UserService = {
    getUserById: (userId) => {
        return axiosClient.get(`/user/getUserById/${userId}`);
    },
    getUsersRecommend: () => {
        return axiosClient.get("/user/getUsersRecommend");
    },
    changePassword: (body) => {
        return axiosClient.post("/user/changePassword", body);
    },
    updateUser: (body) => {
        return axiosClient.post("/user/updateUser", body);
    },
    getProfileUser: (userId) => {
        return axiosClient.get(`/user/getProfileUser/${userId}`);
    },
    filterUser: (body) => {
        return axiosClient.post("/user/filterUser", body);
    },
};

export default UserService;
