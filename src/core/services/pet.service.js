import axiosClient from "./base.js";

const PetService = {
    getPetsByUserLogin: () => {
        return axiosClient.post("/pet/getPetsByUserLogin");
    },
    getPetsByUserLoginPagination: (body) => {
        return axiosClient.post("/pet/getPetsByUserLoginPagination", body);
    },
    createPet: (body) => {
        return axiosClient.post("/pet/createPet", body);
    },
    updatPet: (petId, body) => {
        console.log(petId, body);
        return axiosClient.post(`/pet/updatePet/${petId}`, body);
    },
    getPetById: (petId) => {
        return axiosClient.get(`/pet/getPetById/${petId}`);
    },
    getPostsPet: (petId, body) => {
        return axiosClient.post(`/pet/getPostsPet/${petId}`, body);
    },
    getPetsByUserId: (userId) => {
        return axiosClient.post(`/pet/getPetsByUserId/${userId}`);
    },
    likePet: (petId) => {
        return axiosClient.post(`/pet/likePet/${petId}`);
    },
    filterPet: (body) => {
        return axiosClient.post("/pet/filterPet", body);
    },
};

export default PetService;
