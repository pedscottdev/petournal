"use client";
import React, { useContext, useEffect, useState } from "react";
import ConversationService from "../core/services/conversation.service";
import { SocketContext } from "../core/socket/socket";

function SidebarRow({ Icon, title, active, isChat }) {
    const [unreadCount, setUnreadCount] = useState(0);

    const socket = useContext(SocketContext);

    useEffect(() => {
        countConversationsNotRead();
    }, []);

    useEffect(() => {
        if (socket !== null) {
            const handleReceiveMessage = (data) => {
                countConversationsNotRead();
            };

            const handleChatNotification = () => {
                countConversationsNotRead();
            };
            // Add event listeners
            socket.on("listen-receive-message", handleReceiveMessage);
            socket.on("listen-chat-notification", handleChatNotification);

            // Clean up event listeners when the component unmounts
            return () => {
                socket.off("listen-receive-message", handleReceiveMessage);
                socket.off("listen-chat-notification", handleChatNotification);
            };
        }
    }, [socket]);

    const countConversationsNotRead = async () => {
        const { data } = await ConversationService.countConversationsNotRead();
        setUnreadCount(data);
    };

    return (
        <div
            className={`flex hover:scale-[1.02] w-full hover:duration-75 transition-all items-center justify-center xl:justify-start py-3 px-4 hover:bg-gray-100 rounded-xl cursor-pointer ${active}`}
        >
            {Icon && <Icon className="h-[1.69rem] w-[1.69rem]" />}
            {isChat ? (
                <div className="flex items-center gap-4">
                    <p className={`hidden xl:inline-flex px-4 text-[17px] ${active}`}>{title}</p>
                    {unreadCount > 0 && (
                        <div className="w-6 h-6 flex justify-center items-center rounded-full bg-red-500">
                            <span className="text-white">{unreadCount}</span>
                        </div>
                    )}
                </div>
            ) : (
                <p className={`hidden xl:inline-flex px-4 text-[17px] ${active}`}>{title}</p>
            )}
        </div>
    );
}

export default SidebarRow;
