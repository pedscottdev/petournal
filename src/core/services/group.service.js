import axiosClient from "./base.js";

const GroupService = {
    createGroup: (body) => {
        return axiosClient.post("/group/createGroup", body);
    },
    getGroupsByUserLogin: (body) => {
        return axiosClient.post("/group/getGroupsByUserLogin", body);
    },
    getGroupsByOwner: (body) => {
        return axiosClient.post("/group/getGroupsByOwner", body);
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
    getListUserInvite: () => {
        return axiosClient.post("/group/getListUserInvite");
    },
    getListUserInviteOfGroup: (groupId) => {
        return axiosClient.post(`/group/getListUserInviteOfGroup/${groupId}`);
    },
    updateProfileGroup: (body) => {
        return axiosClient.post("/group/updateProfileGroup", body);
    },
    addUserToGroup: (body) => {
        return axiosClient.post("/group/addUserToGroup", body);
    },
    filterGroup: (body) => {
        return axiosClient.post("/group/filterGroup", body);
    },
};

export default GroupService;
