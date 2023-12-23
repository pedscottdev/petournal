import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import FollowService from "../core/services/follow.service.js";
import toast from "react-hot-toast";
import { PiStarFill } from "react-icons/pi";
import { useRouter } from "next/navigation.js";
import { useSelector } from "react-redux";
import { Checkbox } from "@nextui-org/react";
import { SocketContext } from "../core/socket/socket.js";
import NotificationService from "../core/services/notification.service.js";

function UserCard(props) {
    const { userId, userAvatar, userName, follower, userEmail, leader, link, variant, handleOnSelected } = props;
    const router = useRouter();
    const userStoreId = useSelector((state) => state.user.id);

    const socket = useContext(SocketContext);

    const [isFollowing, setIsFollowing] = useState(false);

    const followUser = async (followId) => {
        const result = await FollowService.followUser(followId);
        return result;
    };

    const unFollowUser = async (followId) => {
        const result = await FollowService.unFollowUser(followId);
        return result;
    };

    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    const handleFollowClick = async () => {
        if (isFollowing) {
            console.log("sadas");
            const result = await unFollowUser(userId);
            console.log(result);
            if (result) {
                toast.success("Đã bỏ theo dõi");
                setIsFollowing(false);
            }
        } else {
            const { data } = await followUser(userId);
            if (data) {
                toast.success("Đã theo dõi");
                setIsFollowing(true);
                const body = { type: "FOLLOW", follow_id: userId };

                if (await isUserNotificationExist(body)) return;

                socket.emit("follow-notification", body);
            }
        }
    };

    const handleCheckboxChange = (isSelected) => {
        handleOnSelected({ isSelected, userId });
    };

    const handleNavigation = () => {
        userStoreId == userId ? router.push(`/profile`) : router.push(`/profile/${userId}`);
    };

    return (
        <div className="py-2 px-4 w-full ">
            <div className="flex items-center gap-x-3 ">
                <div className="flex-shrink-0">
                    <Image
                        src={userAvatar}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="Neil image"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <Link
                        href={variant !== "group" ? `/profile/${userId}` : ""}
                        className="text-[15px] cursor-pointer font-semibold text-gray-900 truncate dark:text-white"
                    >
                        <div className="flex items-center">
                            {userName}{" "}
                            {leader && (
                                <div className="mx-2 ">
                                    <PiStarFill className="text-sm text-yellow-400" />
                                </div>
                            )}
                        </div>
                    </Link>
                    <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                        {variant === "adduser" ? userEmail : follower + " người theo dõi"}
                    </p>
                </div>

                {variant === "group" ? (
                    <div
                        onClick={handleNavigation}
                        className="inline-flex items-center text-[14px] mr-2 font-medium text-violet-600 cursor-pointer dark:text-white p-2 bg-violet-50 rounded-xl px-3"
                    >
                        Xem
                    </div>
                ) : variant === "adduser" ? (
                    <Checkbox color="secondary" onValueChange={handleCheckboxChange}>
                        Thêm
                    </Checkbox>
                ) : (
                    <div>
                        {isFollowing ? (
                            <div className="flex items-center space-x-2">
                                <PiCheckBold className=" cursor-pointer rounded-full w-7 h-7 p-1 text-violet-600 bg-violet-100" />
                                <PiXBold
                                    onClick={handleFollowClick}
                                    className=" cursor-pointer rounded-full w-7 h-7 p-1 text-violet-600 "
                                />
                            </div>
                        ) : (
                            <div
                                className=" inline-flex items-center text-[14px] mr-2 font-medium text-violet-600 cursor-pointer dark:text-white"
                                onClick={handleFollowClick}
                            >
                                Theo dõi
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCard;
