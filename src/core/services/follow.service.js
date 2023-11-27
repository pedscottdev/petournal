import axiosClient from "./base.js";

const FollowService = {
    followUser: (followId) => {
        return axiosClient.post(`/follow/followUser/${followId}`);
    },
    unFollowUser: (followId) => {
        return axiosClient.post(`/follow/unFollowUser/${followId}`);
    },
    getFollowingsByUser: (body) => {
        return axiosClient.post("/follow/getFollowingsByUser", body);
    },
    getFollowersByUser: (body) => {
        return axiosClient.post("follow/getFollowersByUser", body);
    },
};

export default FollowService;
