import axiosClient from "./base.js";

const NotificationService = {
    isUserNotificationExist: (body) => {
        return axiosClient.post("/notification/isUserNotificationExist", body);
    },
    getUserNotification: () => {
        return axiosClient.post("/notification/getUserNotification");
    },
    updateIsRead: (body) => {
        return axiosClient.post("/notification/updateIsRead", body);
    },
};

export default NotificationService;
