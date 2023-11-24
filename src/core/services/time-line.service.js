import axiosClient from "./base.js";

const TimeLineService = {
    getTimeLine: (body) => {
        return axiosClient.post("/timeLine/getTimeLine", body);
    },
};

export default TimeLineService;
