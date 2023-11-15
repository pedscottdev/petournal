import axiosClient from "./base.js";

const PostService = {
    getPostById: (postId) => {
        return axiosClient.get(`/post/getPostById/${postId}`);
    },
    likePost: (postId) => {
        return axiosClient.post(`/post/likePost/${postId}`);
    },
};

export default PostService;
