"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "/src/img/default-avatar.png";
import logoName from "/src/img/logo-name.png";
import NotiCard from "../utils/NotiCard";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
    Badge,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Avatar,
    User,
} from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { resetUserState } from "../core/store/feature/user-slice";
import { io } from "socket.io-client";
import { SocketContext } from "../core/socket/socket";
import NotificationService from "../core/services/notification.service";
import FindingBox from "../components/share/finding-box.js";

function Header() {
    const user = useSelector((state) => {
        return state.user;
    });

    const socket = useContext(SocketContext);

    const [listNoti, setListNoti] = useState([]);
    const [totalNoti, setTotalNoti] = useState();
    const [filterKeyword, setFilterKeyword] = useState("");

    const avatar = user.avatar != null ? user.avatar : defaultAvatar;

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket !== null) {
            getUserNotification();

            const handleLikePostNotification = (data) => {
                setListNoti((prev) => [...prev, data]);
                getUserNotification();
            };

            const handleCommentPostNotification = (data) => {
                setListNoti((prev) => [...prev, data]);
                getUserNotification();
            };

            const handleFollowNotification = (data) => {
                setListNoti((prev) => [...prev, data]);
                getUserNotification();
            };

            const handleLikePetNotification = (data) => {
                setListNoti((prev) => [...prev, data]);
                getUserNotification();
            };

            // Set up socket event listeners
            socket.on("listen-like-post-notification", handleLikePostNotification);
            socket.on("listen-comment-post-notification", handleCommentPostNotification);
            socket.on("listen-follow-notification", handleFollowNotification);
            socket.on("listen-like-pet-notification", handleLikePetNotification);

            // Cleanup: Remove event listeners when the component unmounts
            return () => {
                socket.off("listen-like-post-notification", handleLikePostNotification);
                socket.off("listen-comment-post-notification", handleCommentPostNotification);
                socket.off("listen-follow-notification", handleFollowNotification);
                socket.off("listen-like-pet-notification", handleLikePetNotification);
            };
        }
    }, [socket]); // Make sure to include socket in the dependencies array

    const getUserNotification = async () => {
        const { data } = await NotificationService.getUserNotification();
        setListNoti(data.notifications);
        setTotalNoti(data.totalNotifications);
    };

    useEffect(() => {
        if (!user.accessToken) {
            const timeoutId = setTimeout(() => {
                router.push("/login");
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [user.accessToken, router]);

    const handleLogout = useCallback(async () => {
        dispatch(resetUserState());
        router.refresh();
    }, [dispatch, router]);

    return (
        <div className="flex sticky top-0 z-50 max-h-[65px] justify-between items-center p-4 lg:px-5 bg-white  border-b border-b-gray">
            {/* Center */}
            <div className="flex flex-col relative">
                <div className="hidden md:flex ml-2 items-center rounded-xl bg-[#f8f8f9] py-2 px-3 ">
                    <SearchIcon className="h-4 ml-2 text-gray-500" />
                    <input
                        className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                        type="text"
                        value={filterKeyword}
                        onChange={(e) => setFilterKeyword(e.target.value)}
                        placeholder="Tìm kiếm trên Petournal"
                    ></input>
                </div>
                <div className="absolute top-5 left-2">
                    <FindingBox variant="user" keyword={filterKeyword} />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center sm:space-x-4 justify-end">
                {/* Notification & Messages  */}

                <Popover placement="bottom" showArrow={true}>
                    <Badge
                        className={` ${
                            totalNoti === 0 ? "hidden" : ""
                        } text-xs bg-[#E13232] text-white border-white mr-1`}
                        content={totalNoti}
                        shape="circle"
                        variant="flat"
                        disableoutline="true"
                    >
                        <PopoverTrigger>
                            <Button radius="full" isIconOnly variant="light" className="border-2 border-gray-100">
                                <BellIcon className="w-6 h-6 text-gray-600" />
                            </Button>
                        </PopoverTrigger>
                    </Badge>
                    <PopoverContent className="p-0">
                        <div className="flex text-lg font-semibold py-3 pl-5 justify-start">Thông báo</div>
                        <div className="divide-y divide-gray-100">
                            {listNoti.length > 0 &&
                                listNoti?.map((item) => {
                                    return (
                                        <NotiCard
                                            key={item._id}
                                            notificationId={item._id}
                                            type={item.type}
                                            userName={item.userSend?.lastName + " " + item.userSend?.firstName}
                                            text={item.text}
                                            userAvatar={item.userSend?.avatar}
                                            time={item.createdAt}
                                            handleGetUserNoti={getUserNotification}
                                            isRead={item.isRead}
                                        />
                                    );
                                })}
                            {listNoti?.length === 0 ? <NotiCard type={undefined} /> : null}
                            {/* <NotiCard type="like" />
                            <NotiCard type="comment" />
                            <NotiCard type="follow" />
                            <NotiCard type="" /> */}
                        </div>
                        <div className="flex justify-center text-base font-semibold text-violet-600 py-3 cursor-pointer w-full">
                            Xem thêm
                        </div>
                    </PopoverContent>
                </Popover>

                <Dropdown
                    showArrow
                    radius="sm"
                    classNames={{
                        base: "p-0 border-divider bg-background",
                        arrow: "bg-default-200",
                    }}
                >
                    <DropdownTrigger>
                        <div className="flex flex-row items-center cursor-pointer space-x-4">
                            <Image
                                className="rounded-full cursor-pointer w-9 h-9"
                                src={avatar}
                                width={100}
                                height={100}
                                alt=""
                            />
                            <p className="text-[14px] font-medium flex flex-col">
                                {user.fullName}
                                <span className="text-xs font-light text-gray-500">{user.email}</span>
                            </p>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Custom item styles"
                        className="p-3"
                        itemClasses={{
                            base: [
                                "rounded-md",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "data-[hover=true]:bg-default-100",
                                "dark:data-[hover=true]:bg-default-50",
                                "data-[selectable=true]:focus:bg-default-50",
                                "data-[pressed=true]:opacity-70",
                                "data-[focus-visible=true]:ring-default-500",
                            ],
                        }}
                    >
                        <DropdownSection aria-label="Profile & Actions" showDivider>
                            <DropdownItem key="profile">
                                <Link href="/profile" className="text-[15px]">
                                    Trang cá nhân
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                <Link href="/settings" className="text-[15px]">
                                    Cài đặt
                                </Link>
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection aria-label="Help & Feedback">
                            <DropdownItem key="logout" className="">
                                <p onClick={handleLogout}>Đăng xuất</p>
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;