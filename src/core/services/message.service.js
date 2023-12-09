import axiosClient from "./base.js";

const MessageService = {
    addMessage: (body) => {
        return axiosClient.post("/message/addMessage", body);
    },
    getMessages: (body) => {
        return axiosClient.post("/message/getMessages", body);
    },
};

export default MessageService;
