import axiosClient from "./base.js";

const FollowService = {
    followUser: (followId) => {
        return axiosClient.post(`/follow/followUser/${followId}`);
    },
    unFollowUser: (followId) => {
        return axiosClient.post(`/follow/unFollowUser/${followId}`);
    },
    getFollowingsByUserPagination: (body) => {
        return axiosClient.post("/follow/getFollowingsByUserPagination", body);
    },
    getFollowingsByUser: () => {
        return axiosClient.post("/follow/getFollowingsByUser");
    },
    getFollowersByUser: (body) => {
        return axiosClient.post("follow/getFollowersByUser", body);
    },
    filterFollower: (body) => {
        return axiosClient.post("follow/filterFollower", body);
    },
    filterFollowing: (body) => {
        return axiosClient.post("follow/filterFollowing", body);
    },
};

export default FollowService;
