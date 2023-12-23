import React, { useEffect, useState } from "react";
import FindingCard from "../../utils/FindingCard";
import UserService from "../../core/services/user.service";
import PetService from "../../core/services/pet.service";
import FollowService from "../../core/services/follow.service";
import GroupService from "../../core/services/group.service";

const FindingBox = (props) => {
    const { keyword, variant } = props;
    const [listUser, setListUser] = useState([]);
    const [listPet, setListPet] = useState([]);
    const [listFollower, setListFollower] = useState([]);
    const [listFollowing, setListFollowing] = useState([]);
    const [listGroup, setListGroup] = useState([]);

    useEffect(() => {
        variant === "user"
            ? filterUser(keyword)
            : variant === "pet"
            ? filterPet(keyword)
            : variant === "follower"
            ? filterFollower(keyword)
            : variant === "following"
            ? filterFollowing(keyword)
            : variant === "group"
            ? filterGroup(keyword)
            : null;
    }, [keyword, variant]);

    const filterUser = async (keyword) => {
        if (keyword !== "") {
            const { data } = await UserService.filterUser({ keyword });
            if (data) {
                setListUser(data);
            }
        } else {
            setListUser([]);
        }
    };

    const filterPet = async (keyword) => {
        if (keyword !== "") {
            const { data } = await PetService.filterPet({ keyword });
            if (data) {
                setListPet(data);
            }
        } else {
            setListPet([]);
        }
    };

    const filterFollower = async (keyword) => {
        if (keyword !== "") {
            const { data } = await FollowService.filterFollower({ keyword });
            if (data) {
                setListFollower(data);
            }
        } else {
            setListFollower([]);
        }
    };

    const filterFollowing = async (keyword) => {
        if (keyword !== "") {
            const { data } = await FollowService.filterFollowing({ keyword });
            if (data) {
                setListFollowing(data);
            }
        } else {
            setListFollowing([]);
        }
    };

    const filterGroup = async (keyword) => {
        if (keyword !== "") {
            const { data } = await GroupService.filterGroup({ keyword });
            if (data) {
                setListGroup(data);
            }
        } else {
            setListGroup([]);
        }
    };

    {
        return (
            (listUser.length > 0 ||
                listPet.length > 0 ||
                listFollower.length > 0 ||
                listFollowing.length > 0 ||
                listGroup.length > 0) && (
                <div
                    className={`max-h-[20rem] ${
                        variant === "user"
                            ? "w-[24rem]"
                            : variant === "pet"
                            ? "w-[23rem]"
                            : variant === "follower"
                            ? "w-[23rem]"
                            : variant === "following"
                            ? "w-[23rem]"
                            : variant === "group"
                            ? "w-[23rem]"
                            : null
                    }  overflow-y-auto mt-5 border-b border-x rounded-b-lg`}
                >
                    {variant == "user" &&
                        listUser?.map((user) => {
                            return (
                                <FindingCard
                                    key={user._id}
                                    userId={user._id}
                                    userAvatar={user.avatar}
                                    userName={user.lastName + " " + user.firstName}
                                    email={user.email}
                                    variant="user"
                                />
                            );
                        })}
                    {variant == "pet" &&
                        listPet?.map((pet) => {
                            return (
                                <FindingCard
                                    key={pet._id}
                                    petId={pet._id}
                                    petAvatar={pet.avatar}
                                    petName={pet.name}
                                    petBreed={pet.breed}
                                    variant="pet"
                                />
                            );
                        })}
                    {variant == "follower" &&
                        listFollower?.map((follower) => {
                            return (
                                <FindingCard
                                    key={follower._id}
                                    followerId={follower._id}
                                    followerAvatar={follower.avatar}
                                    followerName={follower.lastName + " " + follower.firstName}
                                    followerEmail={follower.email}
                                    variant="follower"
                                />
                            );
                        })}
                    {variant == "following" &&
                        listFollowing?.map((following) => {
                            return (
                                <FindingCard
                                    key={following._id}
                                    followingId={following._id}
                                    followingAvatar={following.avatar}
                                    followingName={following.lastName + " " + following.firstName}
                                    followingEmail={following.email}
                                    variant="following"
                                />
                            );
                        })}
                    {variant == "group" &&
                        listGroup?.map((group) => {
                            return (
                                <FindingCard
                                    key={group._id}
                                    groupId={group._id}
                                    groupAvatar={group.avatar}
                                    groupName={group.name}
                                    variant="group"
                                />
                            );
                        })}
                </div>
            )
        );
    }
};

export default FindingBox;
