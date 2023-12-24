import axiosClient from "./base.js";

const CommentService = {
    getComments: async (body) => {
        return await axiosClient.post("/comment/getComments", body);
    },
    getTotalCommentCount: async (body) => {
        return await axiosClient.post("/comment/getTotalCommentCount", body);
    },
    getCommentsChild: async (body) => {
        return await axiosClient.post("/comment/getCommentsChild", body);
    },
    createComment: async (body) => {
        return await axiosClient.post("/comment/createComment", body);
    },
    deleteComment: async (commentId) => {
        return await axiosClient.post(`/comment/deleteComment/${commentId}`);
    },
};

export default CommentService;
