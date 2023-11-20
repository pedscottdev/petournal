import axiosClient from "./base.js";

const TimeLineService = {
    getTimeLine: () => {
        return axiosClient.get("/timeLine/getTimeLine");
    },
};

export default TimeLineService;
