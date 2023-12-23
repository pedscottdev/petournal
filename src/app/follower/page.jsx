"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { Tabs, Tab, Chip, Card, CardBody, CircularProgress } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";
import ProfileCard from "../../components/ProfileCard";
import FollowService from "../../core/services/follow.service";
import { useMutation } from "@tanstack/react-query";
import FindingBox from "../../components/share/finding-box";

function follower() {
    const [listFollowings, setListFollowings] = useState([]);
    const [listFollowers, setListFollowers] = useState([]);
    const [followingTotalPages, setFollowingTotalPages] = useState();
    const [followerTotalPages, setFollowerTotalPages] = useState();
    const [totalFollowings, setTotalFollowings] = useState();
    const [totalFollowers, setTotalFollowers] = useState();
    const [countFollowingPage, setCountFollowingPage] = useState(1);
    const [countFollowerPage, setCountFollowerPage] = useState(1);
    const [sortFollowingOption, setSortFollowingOption] = useState();
    const [sortFollowerOption, setSortFollowerOption] = useState();
    const [filterFollowerKeyword, setFilterFollowerKeyword] = useState("");
    const [filterFollowingKeyword, setFilterFollowingKeyword] = useState("");

    useEffect(() => {
        getFollowingsByUserPagination();
        getFollowersByUser();
    }, []);

    const getFollowingsByUserPagination = async () => {
        const { data } = await FollowService.getFollowingsByUserPagination();
        setListFollowings(data.listFollowing);
        setFollowingTotalPages(data.totalPages);
        setTotalFollowings(data.totalFollowings);
    };

    const getFollowersByUser = async () => {
        const { data } = await FollowService.getFollowersByUser();
        setListFollowers(data.listFollower);
        setFollowerTotalPages(data.totalPages);
        setTotalFollowers(data.totalFollowers);
    };

    useEffect(() => {
        if (sortFollowingOption !== undefined || countFollowingPage !== undefined) {
            mutationFollowingPagination.mutate(countFollowingPage);
            mutationFilterFollowings.mutate(sortFollowingOption);
        }
        if (sortFollowerOption !== undefined || countFollowerPage !== undefined) {
            mutationFilterFollowers.mutate(sortFollowerOption);
            mutationFollowerPagination.mutate(countFollowerPage);
        }
    }, [sortFollowingOption, countFollowingPage, sortFollowerOption, countFollowerPage]);

    const mutationFollowingPagination = useMutation({
        mutationFn: async (response) => {
            const body = { page: response, sortBy: sortFollowingOption };
            const result = await FollowService.getFollowingsByUserPagination(body);
            return result.data;
        },
        onSuccess: (data) => {
            setListFollowings(data.listFollowing);
            setTotalFollowings(data.totalFollowings);
        },
    });

    const handleFollowingPagination = async (page) => {
        await setCountFollowingPage(page);
    };

    const mutationFollowerPagination = useMutation({
        mutationFn: async (response) => {
            const body = { page: response, sortBy: sortFollowerOption };
            const result = await FollowService.getFollowersByUser(body);
            return result.data;
        },
        onSuccess: async (data) => {
            await setListFollowers(data.listFollower);
            await setTotalFollowers(data.totalFollowers);
        },
    });

    const handleFollowerPagination = async (page) => {
        await setCountFollowerPage(page);
    };

    const mutationFilterFollowings = useMutation({
        mutationFn: async (response) => {
            const body = { sortBy: response, page: countFollowingPage };
            const { data } = await FollowService.getFollowingsByUserPagination(body);
            return data;
        },
        onSuccess: async (data) => {
            await setListFollowings(data.listFollowing);
        },
    });

    const handleSelectFilterFollowings = async (e) => {
        await setSortFollowingOption(e.target.value);
    };

    const mutationFilterFollowers = useMutation({
        mutationFn: async (response) => {
            const body = { sortBy: response, page: countFollowerPage };
            const result = await FollowService.getFollowersByUser(body);
            return result.data;
        },
        onSuccess: (data) => {
            setListFollowers(data.listFollower);
        },
    });

    const handleSelectFilterFollowers = async (e) => {
        await setSortFollowerOption(e.target.value);
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main className="h-full ">
                <div className="p-6 ">
                    {/* Header */}
                    <div className="text-2xl font-semibold mb-1">Cộng đồng</div>

                    {/* Controller */}
                    <div className="overflow-y-hidden">
                        {/* Tabs */}
                        <div className="flex w-full flex-col ">
                            <Tabs
                                aria-label="Options"
                                color="secondary"
                                variant="underlined"
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
                                    cursor: "w-full bg-[#7C3AED]",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "text-[16px] font-semibold group-data-[selected=true]:text-[#7C3AED]",
                                }}
                            >
                                <Tab
                                    key="followings"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span>Đang theo dõi</span>
                                            <Chip size="sm" variant="faded">
                                                {totalFollowings}
                                            </Chip>
                                        </div>
                                    }
                                >
                                    {/* Contents */}
                                    <div className="space-y-1">
                                        {/* Controller */}
                                        <div className="flex justify-between gap-x-5 w-full  h-full my-4">
                                            <Select
                                                radius="sm"
                                                variant="bordered"
                                                aria-label="Selects"
                                                placeholder="Sắp xếp"
                                                labelPlacement="outside"
                                                className=" h-full w-[15%] bg-white"
                                                onChange={handleSelectFilterFollowings}
                                                selectorIcon={<TbSelector />}
                                            >
                                                <SelectItem key="newest" value="newest">
                                                    Mới nhất
                                                </SelectItem>
                                                <SelectItem key="oldest" value="oldest">
                                                    Cũ nhất
                                                </SelectItem>
                                                {/* <SelectItem key="increasing" value="increasing">
                                                    Từ A-Z
                                                </SelectItem> */}
                                            </Select>

                                            {/* Search */}
                                            <div className="flex flex-col relative">
                                                <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-3 w-[]">
                                                    <SearchIcon className="h-4 ml-2 text-gray-500" />
                                                    <input
                                                        className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                                                        type="text"
                                                        value={filterFollowingKeyword}
                                                        onChange={(e) => setFilterFollowingKeyword(e.target.value)}
                                                        placeholder="Tìm kiếm theo tên"
                                                    ></input>
                                                </div>
                                                <div className="absolute top-8 left-2">
                                                    <FindingBox variant="following" keyword={filterFollowingKeyword} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        {mutationFilterFollowings.isPending || mutationFollowingPagination.isPending ? (
                                            <div className="flex items-center px-6 justify-center w-12 h-12">
                                                <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-3 pt-3 gap-6 p-4">
                                                {listFollowings?.map((following) => {
                                                    return (
                                                        <ProfileCard
                                                            key={following._id}
                                                            userAvatar={following?.following?.avatar}
                                                            userName={
                                                                following?.following?.lastName +
                                                                " " +
                                                                following?.following?.firstName
                                                            }
                                                            userId={following.following?._id}
                                                            gmail={following?.following?.email}
                                                            pet={following.petsUser}
                                                            follower={following.followersUser}
                                                            following={following.followingsUser}
                                                            isUserFollowing={following.isFollowing}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Pagination */}
                                        <div className="flex justify-center pt-2">
                                            <Pagination
                                                isCompact
                                                showControls
                                                key="following"
                                                total={followingTotalPages}
                                                initialPage={countFollowingPage}
                                                onChange={handleFollowingPagination}
                                                color="secondary"
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab
                                    key="followers"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span>Người theo dõi</span>
                                            <Chip size="sm" variant="faded">
                                                {totalFollowers}
                                            </Chip>
                                        </div>
                                    }
                                >
                                    {/* Contents */}
                                    <div className="space-y-4 ">
                                        {/* Controller */}
                                        <div className="flex justify-between gap-x-5 w-full  h-full my-4">
                                            <Select
                                                radius="sm"
                                                aria-label="Select"
                                                variant="bordered"
                                                placeholder="Sắp xếp"
                                                labelPlacement="outside"
                                                className=" h-full w-[15%] bg-white"
                                                onChange={handleSelectFilterFollowers}
                                                selectorIcon={<TbSelector />}
                                            >
                                                <SelectItem key="newest" value="newest">
                                                    Mới nhất
                                                </SelectItem>
                                                <SelectItem key="oldest" value="oldest">
                                                    Cũ nhất
                                                </SelectItem>
                                                {/* <SelectItem key="increasing" value="increasing">
                                                    Từ A-Z
                                                </SelectItem> */}
                                            </Select>

                                            {/* Search */}
                                            <div className="flex flex-col relative">
                                                <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-3 w-[]">
                                                    <SearchIcon className="h-4 ml-2 text-gray-500" />
                                                    <input
                                                        className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                                                        type="text"
                                                        value={filterFollowerKeyword}
                                                        onChange={(e) => setFilterFollowerKeyword(e.target.value)}
                                                        placeholder="Tìm kiếm theo tên"
                                                    ></input>
                                                </div>
                                                <div className="absolute top-8 left-2">
                                                    <FindingBox variant="follower" keyword={filterFollowerKeyword} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        {mutationFilterFollowings.isPending || mutationFollowingPagination.isPending ? (
                                            <div className="flex items-center px-6 justify-center w-12 h-12">
                                                <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-3 pt-3 gap-6 p-4">
                                                {listFollowers.map((follower) => {
                                                    return (
                                                        <ProfileCard
                                                            key={follower._id}
                                                            userAvatar={follower.follower.avatar}
                                                            userName={
                                                                follower.follower.lastName +
                                                                " " +
                                                                follower.follower.firstName
                                                            }
                                                            userId={follower.follower._id}
                                                            gmail={follower.follower.email}
                                                            pet={follower.petsUser}
                                                            follower={follower.followersUser}
                                                            following={follower.followingsUser}
                                                            isUserFollowing={follower.isFollowing}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Pagination */}
                                        <div className="flex justify-center pt-2">
                                            <Pagination
                                                isCompact
                                                showControls
                                                key="follower"
                                                total={followerTotalPages}
                                                onChange={handleFollowerPagination}
                                                initialPage={countFollowerPage}
                                                color="secondary"
                                            />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default React.memo(follower);
