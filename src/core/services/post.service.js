import axiosClient from "./base.js";

const PostService = {
    getPostById: (postId) => {
        return axiosClient.get(`/post/getPostById/${postId}`);
    },
    likePost: (postId) => {
        return axiosClient.post(`/post/likePost/${postId}`);
    },
    createPost: (body) => {
      return axiosClient.post('/post/createPost', body)
    }
};

export default PostService;
