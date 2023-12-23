import axiosClient from "./base.js";

const TimeLineService = {
    getTimeLine: async (body) => {
        return await axiosClient.post("/timeLine/getTimeLine", body);
    },
    getTimeLineByUserId: async (userId, body) => {
        return await axiosClient.post(`/timeLine/getTimeLineByUserId/${userId}`, body);
    },
};

export default TimeLineService;
