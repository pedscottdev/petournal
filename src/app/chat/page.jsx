"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiChatSmile2Line } from "react-icons/ri";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import ConversationCard from "../../utils/ConversationCard";
import { useEffect, useState } from "react";
import Chatbox from "../../components/Chatbox";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main className="flex flex-auto overflow-y-hidden">
        <div className="relative flex w-full h-[calc(100vh-65px)] border-r border-gray-200 overflow-y-hidden">
          {/* <div className="flex w-full "> */}
          {/* Controler */}
          <div className="flex flex-col flex-auto bg-[#FBFBFB] lg:min-w-[32%] lg:max-w-[32%] xl:min-w-[32%] xl:max-w-[32%]">
            {/* Header */}
            <div className="flex flex-col px-6 py-4 space-y-4 border-b border-gray-200">
              {/* User Control */}
              <div className="flex items-center  justify-between">
                <div className="flex items-center gap-x-4">
                  <Image
                    src={defaultAvatar}
                    className="w-10 h-10 rounded-full object-cover"
                    width={128}
                    height={128}
                    quality={100}
                  ></Image>
                  <p className="font-medium text-[15px]">Pedro Scott</p>
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

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
              >
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
                            <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                              <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                              <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                              <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                              <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                              <ConversationCard
                                onClick={handleUserSelect}
                                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                userName="Alex Johnhanson"
                                email="alexjohn@gmail.com"
                              />
                            </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
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
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Alex Johnhanson"
                latestMessage="How are you doing?"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Steven Howard"
                latestMessage="Hey, don't forget to pick me up at 8.00 AM"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Leona Lewis"
                latestMessage="Love you, hope to see you soon"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Bobby Turner"
                latestMessage="What is that girl?"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
                userName="James Barnado"
                latestMessage="How is Robert? Is he still sick?"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=1847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Marc Spector"
                latestMessage="That's is not even real bro"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=1847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Marc Spector"
                latestMessage="That's is not even real bro"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=1847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Marc Spector"
                latestMessage="That's is not even real bro"
                time="23/11/2023"
                hasConversation="true"
              />
              <ConversationCard
                onClick={handleUserSelect}
                userAvatar="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=1847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                userName="Marc Spector"
                latestMessage="That's is not even real bro"
                time="23/11/2023"
                hasConversation="true"
              />
            </div>
          </div>

          {/* Chat box */}
          <div className=" w-[68%] border-l flex border-gray-200">
            {selectedUser ? (
              <div className="w-full gap-y-4 flex-col justify-center items-center">
                <Chatbox
                  userAvatar={selectedUser.userAvatar}
                  userName={selectedUser.userName}
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
