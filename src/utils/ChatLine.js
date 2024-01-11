import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoView } from "react-photo-view";
import MessageService from "../core/services/message.service";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Loading from "../components/share/loading";
import { SocketContext } from "../core/socket/socket";

function ChatLine(props) {
    const { userAvatar, userId, content, time, type, image, messageId, getMessages, handleGetConversation } = props;
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const socket = useContext(SocketContext);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const deleteMessageMutation = useMutation({
        mutationFn: async (data) => {
            const result = await MessageService.deleteMessage({ messageId: data });
            return result.data;
        },
        onSuccess: () => {
            socket.emit("delete-message", { userId });
            toast.success("Đã xoá");
            onClose();
            getMessages();
            handleGetConversation();
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleDeleteMessage = () => {
        deleteMessageMutation.mutate(messageId);
    };

    return (
        <div className="w-full">
            {type === "sender" ? (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex justify-end gap-x-4 px-6 py-1 "
                >
                    <div
                        onClick={onOpen}
                        className="flex w-10 h-10 cursor-pointer rounded-full hover:bg-gray-100 items-center justify-center"
                    >
                        {isHovered ? <BsThreeDots /> : ""}
                    </div>
                    {/* Content */}
                    {image ? (
                        <PhotoView src={image}>
                            <Image
                                src={image}
                                alt="Image"
                                width={300}
                                height={300}
                                className="object-contain rounded-lg"
                            />
                        </PhotoView>
                    ) : (
                        <div className="flex flex-col justify-end px-4 py-2 space-y-2 w-fit h-fit text-white rounded-2xl rounded-tl-none bg-violet-600">
                            <div className="text-[15px] text-right ">{content}</div>

                            <div className="text-xs mt-2 text-right">{time}</div>
                        </div>
                    )}
                    <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover"></img>
                </div>
            ) : type === "receiver" ? (
                <div className="flex justify-start gap-x-4 px-6 py-1 w-full">
                    <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover"></img>

                    {/* Content */}
                    {image ? (
                        <PhotoView src={image}>
                            <Image
                                src={image}
                                alt="Image"
                                width={300}
                                height={300}
                                className="object-contain rounded-lg"
                            />
                        </PhotoView>
                    ) : (
                        <div className="flex flex-col px-4 py-2 space-y-2 h-fit text-gray-700 rounded-2xl rounded-tl-none bg-gray-100">
                            <div className="text-[15px] ">{content}</div>
                            <div className="text-xs mt-2 ">{time}</div>
                        </div>
                    )}
                </div>
            ) : (
                <div>{/* Default case or other conditions */}</div>
            )}
            <Modal size={"xs"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="flex flex-col items-center justify-center">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Xác nhận xoá</ModalHeader>
                            <ModalBody>
                                <div className="flex">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Huỷ
                                    </Button>
                                    <Button color="secondary" onPress={handleDeleteMessage}>
                                        {deleteMessageMutation.isPending ? <Loading /> : "Xoá"}
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ChatLine;
