import React from "react";
import "../app/globals.css";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function FindingCard(props) {
    const {
        userId,
        userAvatar,
        userName,
        email,
        petId,
        petAvatar,
        petName,
        petBreed,
        followerId,
        followerAvatar,
        followerName,
        followerEmail,
        followingId,
        followingAvatar,
        followingName,
        followingEmail,
        groupId,
        groupName,
        groupAvatar,
        variant,
    } = props;

    const router = useRouter();
    const userStore = useSelector((state) => state.user);

    const handleNavigateUser = () => {
        if (userStore.id === userId) {
            router.push("/profile");
        } else {
            router.push(`/profile/${userId}`);
        }
    };
    const handleNavigatePet = () => {
        router.push(`/pets/${petId}`);
    };
    const handleNavigateFollower = () => {
        router.push(`/profile/${followerId}`);
    };
    const handleNavigateFollowing = () => {
        router.push(`/profile/${followingId}`);
    };
    const handleNavigateGroup = () => {
        router.push(`/groups/${groupId}`);
    };

    return (
        <div
            className="px-6 py-5 cursor-pointer bg-white hover:bg-gray-100"
            onClick={
                variant === "user"
                    ? handleNavigateUser
                    : variant === "pet"
                    ? handleNavigatePet
                    : variant === "follower"
                    ? handleNavigateFollower
                    : variant === "following"
                    ? handleNavigateFollowing
                    : variant === "group"
                    ? handleNavigateGroup
                    : null
            }
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-shrink-0 w-[100%] h-full">
                    <img
                        src={
                            variant === "user"
                                ? userAvatar
                                : variant === "pet"
                                ? petAvatar
                                : variant === "follower"
                                ? followerAvatar
                                : variant === "following"
                                ? followingAvatar
                                : variant === "group"
                                ? groupAvatar
                                : null
                        }
                        className="w-11 h-11 rounded-full object-cover flex items-center"
                        alt="User Avatar"
                    ></img>
                    <div className=" ml-4">
                        <a className="text-[15px] font-semibold cursor-pointer  text-gray-900 truncate dark:text-white">
                            {variant === "user"
                                ? userName
                                : variant === "pet"
                                ? petName
                                : variant === "follower"
                                ? followerName
                                : variant === "following"
                                ? followingName
                                : variant === "group"
                                ? groupName
                                : ""}
                        </a>

                        <div className="text-[15px] font-medium truncate limit-word text-gray-500">
                            {variant === "user"
                                ? email
                                : variant === "pet"
                                ? petBreed
                                : variant === "follower"
                                ? followerEmail
                                : variant === "following"
                                ? followingEmail
                                : ""}
                        </div>
                    </div>
                </div>
                <div className="w-[20%] h-full">
                    <div className="text-base text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindingCard;
