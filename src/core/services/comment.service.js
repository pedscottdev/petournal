import axiosClient from "./base.js";

const CommentService = {
    getComments: (body) => {
        return axiosClient.post("/comment/getComments", body);
    },
    getCommentsChild: (body) => {
        return axiosClient.post("/comment/getCommentsChild", body);
    },
    createComment: (body) => {
        return axiosClient.post("/comment/createComment", body);
    },
    deleteComment: (commentId) => {
        return axiosClient.post(`/comment/deleteComment/${commentId}`);
    },
};

export default CommentService;
