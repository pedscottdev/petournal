import axiosClient from "./base.js";

const ConversationService = {
    getConversations: () => {
        return axiosClient.post("/conversation/getConversations");
    },
    updateIsRead: (body) => {
        return axiosClient.post("/conversation/updateIsRead", body);
    },
    countConversationsNotRead: () => {
        return axiosClient.post("/conversation/countConversationsNotRead");
    },
};

export default ConversationService;
