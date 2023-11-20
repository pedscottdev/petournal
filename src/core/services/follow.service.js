import axiosClient from "./base.js";

const FollowService = {
    followUser: (followId) => {
        return axiosClient.post(`/follow/followUser/${followId}`);
    },
    unFollowUser: (followId) => {
        return axiosClient.post(`/follow/unFollowUser/${followId}`);
    }
};

export default FollowService;
