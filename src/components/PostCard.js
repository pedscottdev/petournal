"use client";
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import PetCard from "../utils/PetCard";
import testImage from "/src/img/test-image.jpg";
import testImage2 from "/src/img/test-image2.jpg";
import testImage3 from "/src/img/test-image3.jpg";
import { ChatIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { TbDog, TbHeart } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";
import {
    Badge,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@nextui-org/react";
import { PiDogBold, PiChatCircleBold, PiHeartBold, PiHeartFill, PiCheckBold } from "react-icons/pi";
import CommentParent from "./CommentParent";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import PostService from "../core/services/post.service.js";
import CommentService from "../core/services/comment.service.js";
import handleTimestamp from "../core/utils/timestamp.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Loading from "./share/loading";

function PostCard(props) {
    const { postId, isUserFollowing } = props;

    const [postData, setPostData] = useState();
    const [commentData, setCommentData] = useState([]);
    const [totalComment, setTotalComment] = useState();
    const [commentInput, setCommentInput] = useState("");
    const [countLoadComment, setCountLoadComment] = useState(2);

    const userStore = useSelector((state) => state.user);

    useEffect(() => {
        getPostById();
        getCommentsByPost(postId);
    }, []);

    const getPostById = async () => {
        const { data } = await PostService.getPostById(postId);
        setPostData(data);
    };

    const getCommentsByPost = async (postId) => {
        const body = { post_id: postId };
        const { data } = await CommentService.getComments(body);
        setCommentData(data.comments);
        setTotalComment(data.totalCommentCount);
    };

    const timePostAgo = handleTimestamp(postData?.createdAt);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);

    const toggleCommentSection = () => {
        setIsCommentSectionVisible(!isCommentSectionVisible);
    };

    // Follow Handle
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        if (isFollowing) {
            alert("Đã bỏ theo dõi");
            setIsFollowing(false);
        } else {
            alert("Đã theo dõi");
            setIsFollowing(true);
        }
    };

    // Like Handle
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        if (isLiked) {
            // alert("Đã bỏ thích bài viết");
            setIsLiked(false);
        } else {
            // alert("Đã thích bài viết");
            setIsLiked(true);
        }
    };

    const createComment = async (body) => {
        const result = await CommentService.createComment(body);
        return result;
    };

    const handleComment = async () => {
        const body = { post_id: postId, text: commentInput };
        const result = await createComment(body);
        if (result) {
            await getCommentsByPost(postId);
            await setCommentInput("");
            toast.success("Đã bình luận");
        } else {
            toast.error("Bình luận lỗi");
        }
    };

    const mutationComment = useMutation({
        mutationFn: async (data) => {
            const result = await CommentService.getComments(data);
            return result.data;
        },
        onSuccess: (data) => {
            const newArray = commentData.concat(data.comments);
            setCommentData(newArray);
            setTotalComment(data.totalCommentCount);
            setCountLoadComment((preCount) => preCount + 1);
        },
        onError: (err) => {},
    });

    const handleLoadComment = async () => {
        const body = { page: countLoadComment, post_id: postId };
        mutationComment.mutate(body);
    };

    return (
        <div className="flex justify-center bg-white rounded-xl shadow-sm mt-6">
            <div className="flex flex-col p-6 w-full">
                {/* Header */}
                <div className="flex justify-between">
                    <div className="text-[#6e767d] flex flex-row ">
                        <Image
                            src={postData?.user?.avatar ? postData?.user?.avatar : defaultAvatar}
                            alt="Avatar"
                            width={100}
                            height={100}
                            className="h-11 w-11 rounded-full"
                        />
                        <div className=" group ml-4 mr-5 flex flex-col">
                            <h3 className="font-semibold text-[15px] sm:text-base text-[#000000] hover:underline cursor-pointer">
                                {`${postData?.user?.lastName} ${postData?.user?.firstName}`}
                            </h3>
                            <p className="text-gray-400 text-[14px]">{timePostAgo}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {postData?.user?._id === userStore.id || isUserFollowing === true ? (
                            ""
                        ) : (
                            <div>
                                {isFollowing ? (
                                    <div
                                        onClick={handleFollowClick}
                                        className="flex items-center gap-x-3 mx-8 font-semibold text-[15px] cursor-pointer text-violet-600  bg-[#F6F0FE] p-1 px-4 rounded-full"
                                    >
                                        Đã theo dõi
                                        <PiCheckBold />
                                    </div>
                                ) : (
                                    <div
                                        onClick={handleFollowClick}
                                        className="mx-8 font-semibold text-[15px] cursor-pointer text-violet-600 p-1 px-4 rounded-full"
                                    >
                                        Theo dõi
                                    </div>
                                )}
                            </div>
                        )}

                        <Dropdown>
                            <DropdownTrigger>
                                <div className="flex h-[1.5rem] m-2 cursor-pointer items-center">
                                    <HiDotsHorizontal className="flex text-gray-600 border-none justify-between w-6 h-6" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" onAction={(key) => alert(key)}>
                                <DropdownItem key="new">Báo cáo</DropdownItem>
                                <DropdownItem key="copy">Sửa bài viết</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Xóa bài viết
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                    <p className="text-[#000000] text-[15px] sm:text-base">{postData?.content}</p>
                    <Image
                        src={testImage}
                        className="rounded-xl cursor-pointer max-h-[360px] object-cover mt-4"
                        alt=""
                    />
                </div>

                {/* Metadata */}
                <div className="mt-4 border-b-2 border-gray-100"></div>
                <div className="flex items-center justify-between mx-4 mt-1">
                    <div className="flex items-center gap-2 cursor-pointer w-[33%] justify-center">
                        <div>
                            {isLiked ? (
                                <PiHeartFill
                                    onClick={handleLikeClick}
                                    className="cursor-pointer h-7 w-7 text-violet-500 active:scale-[.90] active:duration-75 transition-all hover:text-violet-500"
                                />
                            ) : (
                                <PiHeartBold
                                    onClick={handleLikeClick}
                                    className="cursor-pointer h-7 w-7 text-gray-700 active:scale-[.84] active:duration-75 transition-all hover:text-violet-500"
                                />
                            )}
                        </div>
                        <p className="text-[15px]">
                            <span className="">{postData?.likes?.length}</span> Like
                        </p>
                    </div>

                    <Button
                        className="flex items-center gap-2 cursor-pointer w-[33%] active:scale-[.94] active:duration-75 transition-all justify-center hover:bg-gray-100 rounded-xl p-2 px-6"
                        variant="light"
                        onClick={toggleCommentSection}
                    >
                        <PiChatCircleBold className="cursor-pointer h-7 w-7 text-gray-700" />
                        <p className="text-[15px]">
                            <span>{totalComment}</span> Comment
                        </p>
                    </Button>

                    <Button
                        className="flex items-center gap-2 cursor-pointer w-[33%] active:scale-[.94] active:duration-75 transition-all justify-center hover:bg-gray-100 rounded-xl p-2 px-6"
                        variant="light"
                        onPress={onOpen}
                    >
                        <PiDogBold className="cursor-pointer h-7 w-7 text-gray-700" />
                        <p className="text-[15px]">
                            <span className="">{postData?.pets?.length}</span> Pet
                        </p>
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col pb-0 text-xl ">
                                        Danh sách thú cưng
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="flow-root divide-y divide-gray-200" role="list">
                                            {postData?.pets?.map((pet) => {
                                                return (
                                                    <PetCard
                                                        key={pet._id}
                                                        petAvatar={pet.avatar}
                                                        petName={pet.name}
                                                        petInfo="Chó Anh lông ngắn"
                                                        path=""
                                                        type="list"
                                                    />
                                                );
                                            })}
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>

                <div className="mt-1 border-b-2 border-gray-100"></div>

                {/* Comment Section */}
                <div
                    className={`comment-section mt-4 antialiased w-full space-y-3 ${
                        isCommentSectionVisible ? "" : "hidden"
                    }`}
                >
                    {commentData?.map((comment) => {
                        return (
                            <CommentParent
                                key={comment._id}
                                commentId={comment._id}
                                commentUser={comment?.user?._id}
                                postId={comment.post}
                                parentImage={comment?.user?.avatar}
                                commentUserName={comment?.user?.lastName + " " + comment?.user?.firstName}
                                createdTime={handleTimestamp(comment?.createdAt)}
                                content={comment?.text}
                                postOwner={postData?.user?._id}
                                getCommentsByPost={getCommentsByPost}
                            />
                        );
                    })}

                    <div
                        onClick={handleLoadComment}
                        className="text-center text-[14px] font-semibold my-4 pt-2 text-gray-700 cursor-pointer"
                    >
                        {mutationComment.isPending ? <Loading /> : "Tải thêm bình luận"}
                    </div>
                </div>

                {/* Comment Input */}
                <div className="flex space-x-4 mt-4">
                    <Image className="rounded-full cursor-pointer w-11 h-11" src={defaultAvatar} alt="" />

                    <div className="w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[43px]"
                                placeholder="Nhập bình luận"
                            ></input>
                            <button
                                onClick={handleComment}
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

export default PostCard;
