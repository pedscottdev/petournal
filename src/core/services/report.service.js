import axiosClient from "./base.js";

const ReportService = {
    createReport: (body) => {
        return axiosClient.post("/report/createReport", body);
    },
};

export default ReportService;
