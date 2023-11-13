import axiosClient from "./base.js"

const PostService = {
    getPostById: (postId) => {
      return axiosClient.get(`/post/getPostById/${postId}`)
    }
}

export default PostService;