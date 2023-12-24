import React from "react";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import { TbX } from "react-icons/tb";
import { useSelector } from "react-redux";
import handleTimestamp from "../core/utils/timestamp";
import NotificationService from "../core/services/notification.service";

function NotiCard(props) {
    const { userAvatar, userName, time, text, type, isRead, notificationId, handleGetUserNoti } = props;

    const userStore = useSelector((state) => state.user);

    const timeAgo = handleTimestamp(time);
    const typeNoti =
        type === "LIKE_POST"
            ? "like-post"
            : type === "FOLLOW"
            ? "follow"
            : type === "COMMENT"
            ? "comment"
            : type === "LIKE_PET"
            ? "like-pet"
            : type === undefined
            ? ""
            : null;

    const handleRead = async () => {
        await NotificationService.updateIsRead({ notification_id: notificationId });
        handleGetUserNoti();
    };

    return (
        <>
            {typeNoti === "follow" ? (
                <div
                    className={`flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm ${
                        isRead ? "" : "font-bold"
                    }`}
                    onClick={handleRead}
                >
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full w-11 h-11 mr-6"
                            alt=""
                            src={userAvatar ? userAvatar : defaultAvatar}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 ">{userName}</span> {text}
                        </div>
                        <div className="text-sm text-gray-500 ">{timeAgo}</div>
                    </div>
                </div>
            ) : typeNoti === "like-post" ? (
                <div
                    className={`flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm ${
                        isRead ? "" : "font-bold"
                    }`}
                    onClick={handleRead}
                >
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full w-11 h-11 mr-6"
                            alt=""
                            src={userAvatar ? userAvatar : defaultAvatar}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 ">{userName}</span> {text}
                        </div>
                        <div className="text-sm text-gray-500 ">{timeAgo}</div>
                    </div>
                </div>
            ) : typeNoti == "comment" ? (
                <div
                    className={`flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm ${
                        isRead ? "" : "font-bold"
                    }`}
                    onClick={handleRead}
                >
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full w-11 h-11 mr-6"
                            alt=""
                            src={userAvatar ? userAvatar : defaultAvatar}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 ">{userName}</span> {text}
                        </div>
                        <div className="text-sm text-gray-500 ">{timeAgo}</div>
                    </div>
                </div>
            ) : typeNoti == "like-pet" ? (
                <div
                    className={`flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm ${
                        isRead ? "" : "font-bold"
                    }`}
                    onClick={handleRead}
                >
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full w-11 h-11 mr-6"
                            alt=""
                            src={userAvatar ? userAvatar : defaultAvatar}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 ">{userName}</span> {text}
                        </div>
                        <div className="text-sm text-gray-500 ">{timeAgo}</div>
                    </div>
                </div>
            ) : typeNoti == "" ? (
                <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm">
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full w-11 h-11 mr-6"
                            alt=""
                            src={userStore.avatar}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">Chưa có thông báo nào</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default NotiCard;
