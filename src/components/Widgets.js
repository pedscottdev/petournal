import React, { useEffect, useState } from "react";
import defaultAvatar from "/src/img/default-avatar.png";
import testAvatar from "/src/img/test-avatar.jpg";
import testAvatar2 from "/src/img/test-avatar2.jpg";
import Image from "next/image";
import UserCard from "../utils/UserCard";
import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import UserService from "../core/services/user.service.js";

function Widgets() {
    const [usersRecommed, setUsersRecommend] = useState([]);

    useEffect(() => {
        getUsersRecommend();
    }, []);

    const getUsersRecommend = async () => {
        const { data } = await UserService.getUsersRecommend();
        setUsersRecommend(data);
    };

    const handleViewRecommendUser = async () => {
        await getUsersRecommend();
    };

    return (
        <div className="py-6 flex-shrink-0 space-y-8 w-full">
            <div className="p-2 rounded-xl bg-white shadow-sm border-1">
                <h4 className="font-semibold text-xl px-4 py-2">Có thể bạn biết</h4>

                {/* Users */}
                <div className="mb-2">
                    {usersRecommed.map((userRecommend) => {
                        return (
                            <UserCard
                                key={userRecommend?.user?._id}
                                userId={userRecommend?.user?._id}
                                userName={userRecommend?.user.lastName + " " + userRecommend?.user.firstName}
                                userAvatar={userRecommend?.user.avatar}
                                follower={userRecommend.followerOfUserRecommend}
                            />
                        );
                    })}
                    {/* <UserCard userName="Thai Son Nguyen" userAvatar={testAvatar} follower="140" />
                    <UserCard userName="Huong Lua Nguyen" userAvatar={testAvatar2} follower="1K" /> */}
                </div>

                <button
                    onClick={handleViewRecommendUser}
                    className="py-2 px-2 rounded-xl hover:bg-violet-100 cursor-pointerflex items-center justify-center w-full text-violet-600 font-semibold active:scale-[.94] active:duration-75 transition-all"
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
}

export default Widgets;
