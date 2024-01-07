import React, { useContext, useEffect, useRef, useState } from "react";
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
import { PhotographIcon } from "@heroicons/react/outline";
import { ImageStorage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

function Chatbox(props) {
    const { userId, userAvatar, userName, handleGetConversation } = props;

    const userStore = useSelector((state) => state.user);
    const socket = useContext(SocketContext);
    const router = useRouter();

    const [listMessages, setListMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [text, setText] = useState("");
    const [page, setPage] = useState(2);
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);

    const scrollRef = useRef();
    const filePickerRef = useRef(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]; // Add the allowed image types

            if (allowedTypes.includes(e.target.files[0].type)) {
                reader.readAsDataURL(e.target.files[0]);
            } else {
                toast.error("Vui lòng thêm tệp định dạng hình ảnh");
                // Optionally, you can reset the input field to clear the invalid selection
                e.target.value = "";
                return;
            }
        }

        reader.onload = async (readerEvent) => {
            const imageFile = readerEvent.target.result;
            const imageRef = ref(ImageStorage, `chat/${userStore.id}/images/${Date.now()}`);

            if (imageFile) {
                await uploadString(imageRef, imageFile, "data_url").then(async (value) => {
                    const downloadURL = await getDownloadURL(value.ref);
                    const body = { to: userId, imageUrl: downloadURL };
                    createMessageMutation.mutate(body);
                });
            }
        };
    };

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
        if (text === "" || text.trim().length === 0) return;
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

    useEffect(() => {
        const scroll = scrollRef.current;
        if (scroll) {
            scroll.scrollTop = scroll.scrollHeight;
        }
    }, [listMessages]);

    // const handleScroll = async () => {
    //     const scrollElement = scrollRef.current;
    //     console.log(scrollElement?.scrollHeight);

    //     if (scrollElement?.scrollTop === 0 && !loadingMoreMessages) {
    //         // User has scrolled to the top
    //         setLoadingMoreMessages(true);

    //         // Fetch more messages and append them to the existing list
    //         const body = { to: userId, page };
    //         const { data } = await MessageService.getMessages(body);
    //         setListMessages((prev) => [...prev, ...data]);

    //         setPage((prevPage) => prevPage + 1);
    //         setLoadingMoreMessages(false);
    //     }
    // };

    const renderMessagesWithDividers = () => {
        const messagesByDate = {};

        // Group messages by date
        listMessages.forEach((message) => {
            const date = new Date(message.updatedAt);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            if (!messagesByDate[formattedDate]) {
                messagesByDate[formattedDate] = [];
            }

            messagesByDate[formattedDate].push(message);
        });

        // Render messages with dividers
        return Object.keys(messagesByDate).map((date) => (
            <div key={date}>
                <Divider label={date} />
                <div className="flex flex-col-reverse">
                    {messagesByDate[date].map((message) => {
                        return (
                            <div ref={scrollRef} key={message._id}>
                                <ChatLine
                                    userAvatar={message.fromSelf ? userStore.avatar : userAvatar}
                                    content={message.message}
                                    image={message.imageUrl}
                                    time={formatTime(message.updatedAt)}
                                    type={message.fromSelf ? "sender" : "receiver"}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        ));
    };

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
            <div className="h-[80%] ">
                <PhotoProvider
                    toolbarRender={({ onScale, scale, rotate, onRotate }) => {
                        return (
                            <div className="flex text-2xl mx-10">
                                <BsZoomIn className="cursor-pointer" onClick={() => onScale(scale + 1)} />
                                <BsZoomOut className="mx-8 cursor-pointer" onClick={() => onScale(scale - 1)} />
                                <RxReload className="cursor-pointer" onClick={() => onRotate(rotate + 90)} />
                            </div>
                        );
                    }}
                >
                    <div
                        ref={scrollRef}
                        // onScroll={handleScroll}
                        className="bg-white  flex flex-col-reverse h-full overflow-y-auto space-y-2 border-b pb-6 border-gray-200"
                    >
                        {renderMessagesWithDividers()}
                    </div>
                </PhotoProvider>
            </div>

            {/* Input */}
            <div className="flex items-center space-x-4 w-full px-6 h-[10%] bg-[#fbfbfb]">
                <button
                    className="active:scale-[.94] p-2 active:duration-75 transition-all rounded-full flex gap-2"
                    onClick={() => filePickerRef.current.click()}
                >
                    <PhotographIcon className="h-10 w-10 text-[#2683D7]" />
                    <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
                </button>
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
