import axiosClient from "./base.js";

const GroupService = {
    createGroup: (body) => {
        return axiosClient.post("/group/createGroup", body);
    },
    getGroupsByUserLogin: () => {
        return axiosClient.post("/group/getGroupsByUserLogin");
    },
    getGroupsByOwner: () => {
        return axiosClient.post("/group/getGroupsByOwner");
    },
    getGroupById: (groupId) => {
        return axiosClient.post(`/group/getGroupById/${groupId}`);
    },
    getMembers: (body) => {
        return axiosClient.post("/group/getMembers", body);
    },
    addPostToGroup: (body) => {
        return axiosClient.post("/group/addPostToGroup", body);
    },
    getPostsFromGroup: (body) => {
        return axiosClient.post("/group/getPostsFromGroup", body);
    },
};

export default GroupService;
