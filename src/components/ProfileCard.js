import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import FollowService from "../core/services/follow.service";
import toast from "react-hot-toast";
import { SocketContext } from "../core/socket/socket";

function ProfileCard(props) {
    const { userAvatar, userName, gmail, pet, follower, following, isUserFollowing, userId } = props;

    const socket = useContext(SocketContext)

    const [isFollowing, setIsFollowing] = useState();
    useEffect(() => {
        if (isUserFollowing == false) {
            setIsFollowing(false);
        } else {
            setIsFollowing(true);
        }
    }, [isUserFollowing]);

    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    const mutationFollow = useMutation({
        mutationFn: async (data) => {
            await FollowService.followUser(data);
        },
        onSuccess: async () => {
            setIsFollowing(true);
            toast.success("Đã theo dõi");

            const body = { type: "FOLLOW", follow_id: userId };

            if (await isUserNotificationExist(body)) return;

            socket.emit("follow-notification", body);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const mutationUnFollow = useMutation({
        mutationFn: async (data) => {
            await FollowService.unFollowUser(data);
        },
        onSuccess: () => {
            setIsFollowing(false);
            toast.success("Đã huỷ theo dõi");
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleFollow = async () => {
        if (isFollowing) {
            mutationUnFollow.mutate(userId);
        } else {
            mutationFollow.mutate(userId);
        }
    };

    return (
        <div className=" bg-white cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl shadow border-1">
            <div className="flex flex-col items-center justify-center w-full m-auto">
                {/* Avatar */}
                <div className="py-5 flex mx-auto">
                    <div className="flex items-center mt-4 justify-center">
                        <img alt="profile" src={userAvatar} className="object-cover w-28 h-28 mx-auto rounded-full" />
                    </div>
                </div>

                {/* User Info */}
                <div className="flex items-center flex-col w-full px-auto">
                    <h2 className="flex text-md font-semibold text-gray-900">{userName}</h2>
                    <p className="text-[15px] text-gray-500">{gmail}</p>
                    <div className="flex items-center mt-4 justify-between space-x-10">
                        <div className="flex flex-col">
                            <div className="text-[15px]">Pet</div>
                            <span className="text-md font-semibold flex flex-col text-center">{pet}</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-[15px]">Follower</div>
                            <span className="text-md font-semibold flex flex-col text-center">{follower} </span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-[15px]">Following</div>
                            <span className="text-md font-semibold flex flex-col text-center">{following}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controller */}
            <div className="flex items-center space-x-5  justify-center w-full py-5">
                <Link href="">
                    <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
                        Xem Profile
                    </button>
                </Link>

                <button
                    className={`${
                        isFollowing ? "bg-violet-50" : "bg-gray-100"
                    } active:scale-[.94] active:duration-75 transition-all p-2 font-medium ${
                        isFollowing ? "text-violet-600" : "text-gray-600"
                    } text-[15px] px-4 rounded-full text-s md:text-base`}
                    onClick={handleFollow}
                    disabled={mutationFollow.isPending || mutationUnFollow.isPending}
                >
                    {mutationFollow.isPending || mutationUnFollow.isPending ? (
                        <div className="flex items-center px-6 justify-center w-6 h-6">
                            <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                        </div>
                    ) : isFollowing ? (
                        "Đang theo dõi"
                    ) : (
                        "Theo dõi"
                    )}
                </button>
            </div>
        </div>
    );
}

export default ProfileCard;
