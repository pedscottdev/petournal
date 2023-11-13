import axiosClient from "./base.js"

const PetService =  {
    getPetsByUserLogin: () => {
        return axiosClient.post("/pet/getPetsByUserLogin")
    }
}

export default PetService