"use client";
import React, { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiChatSmile2Line } from "react-icons/ri";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import ConversationCard from "../../utils/ConversationCard";
import { useEffect, useState } from "react";
import Chatbox from "../../components/Chatbox";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import FollowService from "../../core/services/follow.service";
import { useSelector } from "react-redux";
import ConversationService from "../../core/services/conversation.service";
import { SocketContext } from "../../core/socket/socket";

function chat() {
    const [selectedUser, setSelectedUser] = useState(null);

    const socket = useContext(SocketContext);

    const updateIsRead = async (body) => {
        const { data } = await ConversationService.updateIsRead(body);
        return data;
    };

    const handleUserSelect = async (body) => {
        await setSelectedUser(body.user);
        onClose();
        if (body.conversationId !== null) {
            await updateIsRead({ conversationId: body.conversationId });
            getConversations();
            socket.emit("chat-notification", body.conversationId);
        }
    };

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const userStore = useSelector((state) => state.user);

    const [listFollowing, setListFollowing] = useState([]);
    const [listConversation, setListConversation] = useState([]);

    useEffect(() => {
        getFollowingsByUser();
        getConversations();
    }, []);

    useEffect(() => {
        socket.on("listen-receive-message", (data) => {
            getConversations();
        });
    }, [socket]);

    const getFollowingsByUser = async () => {
        const { data } = await FollowService.getFollowingsByUser();
        setListFollowing(data.listUser);
    };

    const getConversations = async () => {
        const { data } = await ConversationService.getConversations();
        console.log(data);
        setListConversation(data);
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main className="flex flex-auto overflow-y-hidden">
                <div className="relative flex w-full h-[calc(100vh-65px)] border-r border-gray-200 overflow-y-hidden">
                    {/* Controler */}
                    <div className="flex flex-col flex-auto bg-[#FBFBFB] lg:min-w-[32%] lg:max-w-[32%] xl:min-w-[32%] xl:max-w-[32%]">
                        {/* Header */}
                        <div className="flex flex-col px-6 py-4 space-y-4 border-b border-gray-200">
                            {/* User Control */}
                            <div className="flex items-center  justify-between">
                                <div className="flex items-center gap-x-4">
                                    <Image
                                        src={userStore.avatar ? userStore.avatar : defaultAvatar}
                                        className="w-10 h-10 rounded-full object-cover"
                                        width={128}
                                        height={128}
                                        quality={100}
                                    ></Image>
                                    <p className="font-medium text-[15px]">{userStore.fullName}</p>
                                </div>
                                <Button
                                    className="w-10 h-10 p-1 hover:bg-gray-100 rounded-full flex justify-center items-center text-gray-500 active:scale-[.94] active:duration-75 transition-all"
                                    isIconOnly
                                    variant="faded"
                                    onPress={onOpen}
                                >
                                    <AiOutlinePlusCircle className="text-2xl" />
                                </Button>
                            </div>

                            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">
                                                Cuộc trò chuyện mới
                                            </ModalHeader>
                                            <ModalBody>
                                                <div>
                                                    {/* Search */}
                                                    <div className="hidden md:flex items-center border border-gray-300 rounded-full bg-[#f8f8f9] py-2.5 px-3 ">
                                                        <SearchIcon className="h-5 w-5 ml-2 text-gray-500" />
                                                        <input
                                                            className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink"
                                                            type="text"
                                                            placeholder="Tìm kiếm người dùng"
                                                        ></input>
                                                    </div>
                                                    <div className="h-[20rem] overflow-y-auto mt-5 border-t divide-y divide-gray-200">
                                                        {listFollowing?.map((following) => {
                                                            return (
                                                                <ConversationCard
                                                                    key={following._id}
                                                                    isRead={false}
                                                                    conversationId={null}
                                                                    onClick={handleUserSelect}
                                                                    userAvatar={following.following.avatar}
                                                                    userId={following.following._id}
                                                                    userName={
                                                                        following.following.lastName +
                                                                        " " +
                                                                        following.following.firstName
                                                                    }
                                                                    email={following.following.email}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    <p className="font-medium text-[15px]">Đóng</p>
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>

                            {/* Search */}
                            <div className="hidden md:flex items-center border border-gray-300 rounded-full bg-[#f8f8f9] py-2.5 px-3 ">
                                <SearchIcon className="h-5 w-5 ml-2 text-gray-500" />
                                <input
                                    className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink"
                                    type="text"
                                    placeholder="Tìm kiếm cuộc hội thoại"
                                ></input>
                            </div>
                        </div>

                        {/* Conversation List */}
                        <div className="h-full flex-auto overflow-y-auto divide-y divide-gray-200 lg:min-w-100 lg:max-w-100">
                            {listConversation?.map((conversation) => {
                                return (
                                    <ConversationCard
                                        key={conversation._id}
                                        onClick={handleUserSelect}
                                        conversationId={conversation._id}
                                        isRead={
                                            userStore.id !== conversation.userReceive ? true : conversation.isRead
                                        }
                                        userId={conversation.userPartner._id}
                                        userAvatar={conversation.userPartner.avatar}
                                        userName={
                                            conversation.userPartner.lastName + " " + conversation.userPartner.firstName
                                        }
                                        selfChat={conversation.isUserSend}
                                        latestMessage={conversation.lastMessage.message}
                                        time={formatDate(conversation.lastMessage.updatedAt)}
                                        hasConversation="true"
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Chat box */}
                    <div className=" w-[68%] border-l flex border-gray-200">
                        {selectedUser ? (
                            <div className="w-full gap-y-4 flex-col justify-center items-center">
                                <Chatbox
                                    userId={selectedUser.userId}
                                    userAvatar={selectedUser.userAvatar}
                                    userName={selectedUser.userName}
                                    handleGetConversation={getConversations}
                                />
                            </div>
                        ) : (
                            <div className="flex w-full h-full gap-y-4 flex-col justify-center items-center">
                                <RiChatSmile2Line className="text-gray-600 w-20 h-20" />
                                <div className="text-lg text-gray-600 font-semibold">
                                    Chọn một cuộc trò chuyện để bắt đầu.
                                </div>
                            </div>
                        )}
                    </div>
                    {/* </div> */}
                </div>
            </main>
        </>
    );
}

export default React.memo(chat);

const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
