import axiosClient from "./base.js";

const TimeLineService = {
    getTimeLine: (body) => {
        return axiosClient.post("/timeLine/getTimeLine", body);
    },
    getTimeLineByUserId: (userId, body) => {
        return axiosClient.post(`/timeLine/getTimeLineByUserId/${userId}`, body);
    },
};

export default TimeLineService;
