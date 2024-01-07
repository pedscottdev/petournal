import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { MdSubdirectoryArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import defaultAvatar from "/src/img/default-avatar.png";
import testAvatar from "/src/img/test-avatar.jpg";
import CommentChild from "./CommentChild";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import CommentService from "../core/services/comment.service";
import handleTimestamp from "../core/utils/timestamp";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import NotificationService from "../core/services/notification.service";
import { SocketContext } from "../core/socket/socket";

function CommentParent(props) {
    const {
        commentId,
        postId,
        parentImage,
        commentUser,
        commentUserName,
        content,
        createdTime,
        postOwner,
        removeCommentById,
        getCommentsByPost,
        getTotalCommentCount,
        commentPosition,
    } = props;

    const [isCommentVisible, setCommentVisible] = useState(false);
    const [isReplyVisible, setReplyVisible] = useState(false);
    const [commentChildData, setCommentChildData] = useState([]);
    const [commentChildInput, setCommentChildInput] = useState("");

    const userLogin = useSelector((state) => state.user);
    const socket = useContext(SocketContext);

    const toggleComment = () => {
        setCommentVisible(!isCommentVisible);
    };

    const toggleReplyComment = () => {
        setReplyVisible(!isReplyVisible);
    };

    useEffect(() => {
        getCommentsChild();
    }, []);

    const getCommentsChild = async () => {
        const body = { post_id: postId, comment_id: commentId };
        const { data } = await CommentService.getCommentsChild(body);
        if (data) {
            setCommentChildData(data);
        }
    };

    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    useEffect(() => {
        if (socket !== null) {
            const handleCommentChildPostAction = (data) => {
                if (data.post === postId) {
                    setCommentChildData((prev) => [...prev, data]);
                }
            };

            socket.on("listen-comment-child-post-action", handleCommentChildPostAction);

            // Cleanup function
            return () => {
                socket.off("listen-comment-child-post-action", handleCommentChildPostAction);
            };
        }
    }, [socket]);

    const createReplyComment = async (body) => {
        const result = await CommentService.createComment(body);
        return result.data;
    };

    const handleReplyComment = async () => {
        if (commentChildInput === "") return;
        const body = { comment_id: commentId, post_id: postId, text: commentChildInput };
        const result = await createReplyComment(body);
        if (result) {
            await socket.emit("comment-child-post-action", { comment_id: result._id });
            await setCommentChildInput("");
            setCommentVisible(true);

            const data = { type: "COMMENT", post_id: postId, comment_id: commentId };
            if (await isUserNotificationExist(data)) return;
            if (postOwner === userLogin.id) return;
            await socket.emit("comment-post-notification", data);
        }
        else{
            toast.error("Bình luận đã được xoá");
        }
    };

    const handleDeleteComment = async () => {
        const result = confirm("Xác nhận xoá");
        if (result == true) {
            const { data } = await CommentService.deleteComment(commentId);
            if (data) {
                // socket.emit("delete-comment-action", { comment_id: commentId, post_id: postId, position: commentPosition });
                await removeCommentById(commentId);
                await getTotalCommentCount();
                await getCommentsByPost({ post_id: postId, position: commentPosition });
                await toast.success("Đã xoá");
            }
        }
    };

    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-3">
                <Image
                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                    src={parentImage ? parentImage : testAvatar}
                    alt="parentImage"
                    width={100}
                    height={100}
                />
            </div>

            <div className="flex-1 border-2 border-gray-100 rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed">
                <div className="flex items-center">
                    <p className="font-semibold">{commentUserName}</p>
                    <span className="ml-2 text-sm text-gray-400">{createdTime}</span>
                </div>

                <p className="text-[15px]">{content}</p>

                <div className="mt-2 flex space-x-6 items-center">
                    <div className="flex mx-2 " onClick={toggleComment}>
                        <PiCaretDownBold className={` h-5 w-5  ${isCommentVisible ? "hidden" : ""}`} />
                        <PiCaretUpBold className={` h-5 w-5  ${isCommentVisible ? "" : "hidden"}`} />
                        <div className="text-sm ml-4 text-gray-500 font-semibold cursor-pointer">
                            {`${isCommentVisible ? "Ẩn" : "Hiển thị"} phản hồi`}{" "}
                            <span>({commentChildData?.length})</span>
                        </div>
                    </div>
                    <div
                        className="text-sm ml-4 text-gray-500 font-semibold cursor-pointer"
                        onClick={toggleReplyComment}
                    >
                        Trả lời
                    </div>
                    <div
                        onClick={handleDeleteComment}
                        className="text-sm ml-4 text-gray-500 font-semibold cursor-pointer"
                    >
                        {commentUser == userLogin.id || postOwner == userLogin.id ? "Xóa bình luận" : ""}
                    </div>
                </div>

                {/* Child Comment */}
                <div className={` ${isCommentVisible ? "" : "hidden"}`}>
                    {commentChildData?.map((commentChild) => {
                        return (
                            <CommentChild
                                key={commentChild?._id}
                                commentChildId={commentChild?._id}
                                commentChildAvatar={commentChild?.user?.avatar}
                                commentUserName={commentChild?.user?.lastName + " " + commentChild?.user?.firstName}
                                createdTime={handleTimestamp(commentChild?.createdAt)}
                                content={commentChild?.text}
                                getCommentsChild={getCommentsChild}
                                postId={postId}
                                postOwner={postOwner}
                                commentId={commentId}
                                commentChildUser={commentChild?.user?._id}
                                userLogin={userLogin.id}
                            />
                        );
                    })}
                </div>

                {/* Input Reply Comment */}
                <div className={`flex space-x-4 mt-4 ${isReplyVisible ? "" : "hidden"}`}>
                    <Image
                        className="rounded-full cursor-pointer w-10 h-10"
                        src={userLogin.avatar ? userLogin.avatar : defaultAvatar}
                        alt=""
                        // layout="responsive"
                        width={48}
                        height={48}
                    />

                    <div className="w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[43px]"
                                placeholder="Trả lời bình luận"
                                value={commentChildInput}
                                onChange={(e) => setCommentChildInput(e.target.value)}
                            ></input>
                            <button
                                onClick={handleReplyComment}
                                className="active:scale-[.90] active:duration-75 transition-all bg-violet-600 text-white text-lg rounded-full p-2.5 ml-2 "
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentParent;
