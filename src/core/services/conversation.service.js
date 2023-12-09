import axiosClient from "./base.js";

const ConversationService = {
    getConversations: () => {
        return axiosClient.post("/conversation/getConversations");
    },
};

export default ConversationService;
