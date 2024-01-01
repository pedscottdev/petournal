import React, { useContext, useEffect, useState } from "react";
import defaultAvatar from "../img/default-avatar.png";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiArrowCircleRight } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import ChatLine from "../utils/ChatLine";
import Divider from "../utils/Divider";
import MessageService from "../core/services/message.service";
import { useSelector } from "react-redux";
import { SocketContext } from "../core/socket/socket";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function Chatbox(props) {
    const { userId, userAvatar, userName, handleGetConversation } = props;

    const userStore = useSelector((state) => state.user);
    const socket = useContext(SocketContext);
    const router = useRouter();

    const [listMessages, setListMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        getMessages();
    }, [props]);

    const getMessages = async () => {
        const body = { to: userId };
        const { data } = await MessageService.getMessages(body);
        setListMessages(data);
    };

    const createMessageMutation = useMutation({
        mutationFn: async (data) => {
            const result = await MessageService.addMessage(data);
            return result.data;
        },
        onSuccess: async (data) => {
            const body = { userId, data };
            await socket.emit("send-message", body);
            const msgs = [...listMessages];
            msgs.push({
                _id: data._id,
                fromSelf: true,
                message: data.message,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            });
            setListMessages(msgs);
            setText("");
            
            handleGetConversation();
        },
    });

    const handleSend = async () => {
        const body = { to: userId, message: text };
        createMessageMutation.mutate(body);
    };

    const handleCheckProfile = () => {
        router.push(`/profile/${userId}`);
    };

    useEffect(() => {
        if (socket) {
            socket.on("listen-receive-message", (msg) => {
                setArrivalMessage({
                    _id: msg._id,
                    fromSelf: false,
                    message: msg.message,
                    createdAt: msg.createdAt,
                    updatedAt: msg.updatedAt,
                });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setListMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    return (
        <div className="bg-[#FBFBFB] h-full">
            {/* Header */}
            <div className="flex items-center p-6 h-[10%] py-4 border-b border-gray-200 justify-between">
                <div className="flex items-center gap-x-4">
                    <img src={userAvatar} className="w-10 h-10 rounded-full object-cover"></img>
                    <p className="font-medium text-lg">{userName}</p>
                </div>
                <div className="flex gap-x-2">
                    <button
                        onClick={handleCheckProfile}
                        className="w-11 h-11 p-1 hover:bg-gray-100 rounded-full flex justify-center items-center text-gray-500 active:scale-[.94] active:duration-75 transition-all"
                    >
                        <HiOutlineUserCircle className="text-3xl" />
                    </button>
                    <button className="w-11 h-11 p-1 hover:bg-gray-100 rounded-full flex justify-center items-center text-gray-500 active:scale-[.94] active:duration-75 transition-all">
                        <MdMoreVert className="text-3xl" />
                    </button>
                </div>
            </div>

            {/* Threads */}
            <div className="flex overflow-y-auto flex-col-reverse h-[80%] ">
                <div className="bg-white h-full overflow-y-auto space-y-2 border-b pb-6 border-gray-200">
                    <Divider label="28 Tháng 10" />
                    {listMessages?.map((message) => {
                        return (
                            <ChatLine
                                key={message._id}
                                userAvatar={message.fromSelf == true ? userStore.avatar : userAvatar}
                                content={message.message}
                                time={formatTime(message.updatedAt)}
                                type={message.fromSelf == true ? "sender" : "receiver"}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Input */}
            <div className="flex items-center space-x-4 w-full px-6 h-[10%] bg-[#fbfbfb]">
                <div className="w-full flex items-center border-2 border-gray-300 rounded-full bg-[#f8f8f9] py-2.5 px-3 ">
                    <input
                        className=" flex w-full ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nhập tin nhắn"
                    ></input>
                </div>
                <button className="active:scale-[.94] active:duration-75 transition-all" onClick={handleSend}>
                    <HiArrowCircleRight className="w-11 h-11 text-violet-600" />
                </button>
            </div>
        </div>
    );
}

export default Chatbox;

const formatTime = (inputDate) => {
    const date = new Date(inputDate);

    // Add 7 hours to convert to GMT+7
    date.setUTCHours(date.getUTCHours() + 7);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
};
