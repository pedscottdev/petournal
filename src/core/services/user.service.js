import axiosClient from "./base.js"

const UserService = {
    getUserById: (userId) => {
        return axiosClient.get(`/user/getUserById/${userId}`)
    },
    getUsersRecommend: () => {
      return axiosClient.get("/user/getUsersRecommend")
    }
}

export default UserService;