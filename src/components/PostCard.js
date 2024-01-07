"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import "../app/globals.css";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import PetCard from "../utils/PetCard";
import testImage from "/src/img/test-image.jpg";
import testImage2 from "/src/img/test-image2.jpg";
import testImage3 from "/src/img/test-image3.jpg";
import {
    Select,
    SelectItem,
    Avatar,
    CircularProgress,
    Skeleton,
    CheckboxGroup,
    Checkbox,
    Divider,
} from "@nextui-org/react";
import { ChatIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { TbHeart, TbHeartFilled, TbMessage2, TbDog } from "react-icons/tb";
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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "./share/loading";
import CommentParent from "./CommentParent";
import handleTimestamp from "../core/utils/timestamp.js";
import PostService from "../core/services/post.service.js";
import CommentService from "../core/services/comment.service.js";
import { Textarea } from "@nextui-org/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { resetIsChecked, setUserPets } from "../core/store/feature/pet-slice";

import { PhotographIcon, EmojiHappyIcon, XIcon } from "@heroicons/react/outline";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ImageStorage } from "../../firebase";
import { useRouter } from "next/navigation";
import { SocketContext } from "../core/socket/socket";
import NotificationService from "../core/services/notification.service";
import { IoMdAdd } from "react-icons/io";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

import ReportService from "../core/services/report.service";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoView, PhotoProvider } from "react-photo-view";

function PostCard(props) {
    const { postId, isUserFollowing, isUserLiked, handleGetTimeLine, handleResetPage, variant } = props;

    const socket = useContext(SocketContext);

    const userPets = useSelector((state) => state.pet);
    const [postData, setPostData] = useState();
    const [commentData, setCommentData] = useState([]);
    const [commentDataSocket, setCommentDataSocket] = useState([]);
    const [commentDataTemp, setCommentDataTemp] = useState([]);
    const [totalComment, setTotalComment] = useState();
    const [totalCommentParent, setTotalCommentParent] = useState();
    const [commentInput, setCommentInput] = useState("");
    const [countLoadComment, setCountLoadComment] = useState(2);
    const [usersLike, setUsersLike] = useState([]);
    const [showEmojis, setShowEmojis] = useState(false);

    const [inputUpdate, setInputUpdate] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [isLoaded, setIsLoaded] = useState(true);
    const [position, setPosition] = useState();
    const [selectedReason, setSelectedReason] = useState([]);

    const userStore = useSelector((state) => state.user);

    const isUserLogin = postData?.user?._id === userStore.id;

    const router = useRouter();

    useEffect(() => {
        getPostById();
        getTotalCommentCount();
    }, []);
    useEffect(() => {
        getCommentsByPost({ post_id: postId });
    }, [postId]);

    const updatePostMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PostService.updatePost(postId, data);
            return result.data;
        },
        onSuccess: async (data) => {
            await toast.success("Đã cập nhật post");
            onEditClose();
            setPostData(data);
            setIsLoaded(true);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const updatePost = async () => {
        let body;
        const imageRef = ref(ImageStorage, `posts/${userStore.id}/images/${Date.now()}`);
        if (selectedFile) {
            setIsLoaded(false);
            await uploadString(imageRef, selectedFile, "data_url").then(async (value) => {
                const downloadURL = await getDownloadURL(value.ref);
                body = { content: inputUpdate, imageUrl: downloadURL };
            });
        } else {
            body = { content: inputUpdate };
        }

        updatePostMutation.mutate(body);
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    const addImageToPet = (e) => {
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

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const getPostById = async () => {
        const { data } = await PostService.getPostById(postId);
        setPostData(data);
        setInputUpdate(data?.content);
        setUsersLike(data?.likes);
        if (isUserLiked) {
            setIsLiked(true);
        }
    };

    const getCommentsByPost = async (body) => {
        const { data } = await CommentService.getComments(body);
        if (data) {
            setCommentData(data.comments);
            setTotalCommentParent(data.totalCommentParent);
        }
    };

    const getTotalCommentCount = async () => {
        const { data } = await CommentService.getTotalCommentCount({ post_id: postId });
        setTotalComment(data);
    };

    const timePostAgo = handleTimestamp(postData?.createdAt);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onOpenChange: onEditOpenChange,
        onClose: onEditClose,
    } = useDisclosure();

    const {
        isOpen: isReportOpen,
        onOpen: onReportOpen,
        onOpenChange: onReportOpenChange,
        onClose: onReportClose,
    } = useDisclosure();

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

    const likePost = async (postId) => {
        const { data } = await PostService.likePost(postId);
        if (data) {
            await setUsersLike(data);
        }
    };
    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    const handleLikeClick = async () => {
        if (isLiked) {
            await likePost(postId);
            await toast.success("Đã bỏ thích bài viết");
            await likePostActionSocket();
            await setIsLiked(false);
        } else {
            await likePost(postId);
            await toast.success("Đã thích bài viết");
            await socket.emit("like-post-action", { post_id: postId });
            const body = { type: "LIKE_POST", post_id: postId };
            await setIsLiked(true);

            if (await isUserNotificationExist(body)) return;
            if (isUserLogin) return;

            await socket.emit("like-post-notification", body);
        }
    };

    useEffect(() => {
        if (socket !== null) {
            const handleLikePostAction = (data) => {
                setUsersLike(data);
            };

            const handleCommentPostAction = (data) => {
                if (data.post === postId) {
                    setCommentDataSocket((prev) => {
                        return [data, ...prev];
                    });
                }
            };

            // const handleDeleteCommentAction = (body) => {
            //     const { comment_id, post_id, position } = body;
            //     if (post_id === postId) {
            //         setCommentDataTemp((prev) => prev.filter((item) => item._id !== comment_id));
            //         setCommentDataSocket((prev) => prev.filter((item) => item._id !== comment_id));
            //         getPostById({ post_id: post_id, position: position });
            //         getTotalCommentCount();
            //     }
            // };

            socket.on("listen-like-post-action", handleLikePostAction);
            socket.on("listen-comment-post-action", handleCommentPostAction);
            // socket.on("listen-delete-comment-action", handleDeleteCommentAction);

            // Cleanup function
            return () => {
                socket.off("listen-like-post-action", handleLikePostAction);
                socket.off("listen-comment-post-action", handleCommentPostAction);
                // socket.off("listen-delete-comment-action", handleDeleteCommentAction);
            };
        }
    }, [socket]);

    useEffect(() => {
        const commentArray = commentDataSocket.concat(commentData);
        setCommentDataTemp(commentArray);
        setPosition(commentDataSocket.length > 0 ? commentDataSocket[commentDataSocket.length - 1].createdAt : null);
    }, [commentDataSocket, commentData]);

    const removeCommentById = (commentId) => {
        setCommentDataTemp((prev) => prev.filter((item) => item._id !== commentId));
        setCommentDataSocket((prev) => prev.filter((item) => item._id !== commentId));
    };

    const createComment = async (body) => {
        const result = await CommentService.createComment(body);
        return result.data;
    };

    const handleComment = async () => {
        if (commentInput.trim() === "") return;
        const body = { post_id: postId, text: commentInput };
        const result = await createComment(body);
        if (result) {
            await socket.emit("comment-post-action", { comment_id: result._id });
            const data = { type: "COMMENT", post_id: postId, comment_id: result._id };
            setCommentInput("");
            setCountLoadComment(2);
            getTotalCommentCount();
            setIsCommentSectionVisible(true);
            toast.success("Đã bình luận");

            if (await isUserNotificationExist(data)) return;
            if (isUserLogin) return;

            await socket.emit("comment-post-notification", data);
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
            const newArray = commentDataTemp.concat(data.comments);
            setCommentDataTemp(newArray);
            getTotalCommentCount();
            setCountLoadComment((preCount) => preCount + 1);
        },
        onError: (err) => {},
    });

    const handleLoadComment = async () => {
        const body = { page: countLoadComment, post_id: postId, position: position };

        mutationComment.mutate(body);
    };

    const mutationDeletePost = useMutation({
        mutationFn: async (postId) => {
            await PostService.deletePost(postId);
        },
        onSuccess: () => {
            toast.success("Xoá thành công");
            handleGetTimeLine();
            handleResetPage();
        },
    });

    const filePickerRef = useRef(null);

    const handleDeletePost = () => {
        const response = confirm("Xác nhận xoá");
        if (response) {
            mutationDeletePost.mutate(postId);
        } else {
            toast.error("Đã huỷ xoá");
        }
    };

    const handleNavigate = () => {
        router.push(`/profile/${postData?.user?._id}`);
    };

    const handleNavigatePersonal = () => {
        router.push(`/profile`);
    };

    const reportPostMutation = useMutation({
        mutationFn: async (data) => {
            const body = { type: "POST", post: postId, reasons: data };
            const result = await ReportService.createReport(body);
            return result.data;
        },
        onSuccess: () => {
            toast.success("Đã báo cáo");
            onReportClose();
            setSelectedReason([]);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleReport = () => {
        console.log(selectedReason);
        reportPostMutation.mutate(selectedReason);
    };

    return (
        <div className="flex justify-center bg-white rounded-xl shadow-sm border-1 borrder-gray-200 mt-6">
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
                            <h3
                                className="font-semibold text-[15px] sm:text-base text-[#000000] hover:underline cursor-pointer"
                                onClick={isUserLogin ? handleNavigatePersonal : handleNavigate}
                            >
                                {`${postData?.user?.lastName} ${postData?.user?.firstName}`}
                            </h3>

                            <p className="text-gray-400 text-[14px]">{timePostAgo}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isUserLogin || isUserFollowing === true ? (
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
                            <DropdownMenu aria-label="Action event example">
                                {!isUserLogin ? (
                                    <DropdownItem key="new" onPress={onReportOpen}>
                                        Báo cáo
                                    </DropdownItem>
                                ) : (
                                    ""
                                )}
                                {isUserLogin ? (
                                    <DropdownItem key="copy" onPress={onEditOpen}>
                                        Sửa bài viết
                                    </DropdownItem>
                                ) : (
                                    ""
                                )}
                                {isUserLogin ? (
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        onClick={handleDeletePost}
                                    >
                                        Xóa bài viết
                                    </DropdownItem>
                                ) : (
                                    ""
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                {/* Modal For Report Posts */}
                <Modal backdrop="opaque" isOpen={isReportOpen} onOpenChange={onReportOpenChange} radius="lg">
                    <ModalContent>
                        {(onReportClose) => (
                            <>
                                <ModalHeader className="flex flex-col items-center justify-center text-xl gap-1">
                                    Báo cáo
                                </ModalHeader>
                                <Divider />
                                <ModalBody>
                                    <p className="text-gray-900 font-bold text-xl">Hãy chọn vấn đề</p>
                                    <p className="text-gray-600 text-sm font-light">
                                        Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự
                                        giúp đỡ trước khi báo cáo với Petournal.
                                    </p>
                                    <CheckboxGroup
                                        color="secondary"
                                        value={selectedReason}
                                        onValueChange={setSelectedReason}
                                        className="mt-4 w-[400px]"
                                    >
                                        <Checkbox className="p-4 w-full rounded-md hover:bg-violet-100" value="Hành hạ">
                                            <div className="flex items-center w-[350px] justify-between">
                                                <p className="pl-4">Hành hạ</p>
                                                <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                    <IoMdAdd />
                                                </div>
                                            </div>
                                        </Checkbox>
                                        <Checkbox
                                            className="p-4 rounded-md hover:bg-violet-100"
                                            value="Bạc đãi thú cưng"
                                        >
                                            <div className="flex items-center w-[350px] justify-between">
                                                <p className="pl-4">Bạc đãi thú cưng</p>
                                                <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                    <IoMdAdd />
                                                </div>
                                            </div>
                                        </Checkbox>
                                        <Checkbox
                                            className="p-4 rounded-md hover:bg-violet-100"
                                            value="Ngôn từ thù ghét"
                                        >
                                            <div className="flex items-center w-[350px] justify-between">
                                                <p className="pl-4">Ngôn từ thù ghét</p>
                                                <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                    <IoMdAdd />
                                                </div>
                                            </div>
                                        </Checkbox>
                                        <Checkbox className="p-4 rounded-md hover:bg-violet-100" value="Tiêu cực">
                                            <div className="flex items-center w-[350px] justify-between">
                                                <p className="pl-4">Tiêu cực</p>
                                                <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                    <IoMdAdd />
                                                </div>
                                            </div>
                                        </Checkbox>
                                        <Checkbox className="p-4 rounded-md hover:bg-violet-100" value="Spam">
                                            <div className="flex items-center w-[350px] justify-between">
                                                <p className="pl-4">Spam</p>
                                                <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                    <IoMdAdd />
                                                </div>
                                            </div>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onReportClose}>
                                        Huỷ
                                    </Button>
                                    <Button color="secondary" onClick={handleReport}>
                                        {reportPostMutation.isPending ? <Loading /> : "Gửi"}
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Modal For Editting Posts */}
                <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} isDismissable={false} size="3xl">
                    <ModalContent>
                        {(onEditClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Chỉnh sửa bài viết</ModalHeader>
                                <ModalBody>
                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2   text-sm grid-cols-1 md:grid-cols-6">
                                            <div className="md:col-span-6">
                                                <Textarea
                                                    className="text-md"
                                                    size="lg"
                                                    variant="underlined"
                                                    labelPlacement="outside"
                                                    placeholder="Nhập nội dung bài viết"
                                                    maxRows={2}
                                                    value={postData?.content}
                                                />
                                            </div>

                                            <div className="md:col-span-6">
                                                <div className="flex mb-1">
                                                    <button
                                                        className="active:scale-[.94] p-2 active:duration-75 transition-all hover:bg-gray-100 rounded-full flex gap-2"
                                                        onClick={() => filePickerRef.current.click()}
                                                    >
                                                        <PhotographIcon className="h-6 w-6 text-[#2683D7]" />
                                                        <p className="font-medium text-[15px] text-[#5C6A80]">
                                                            {postData?.imageUrl ? "Sửa ảnh" : "Thêm ảnh"}
                                                        </p>
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={addImageToPet}
                                                            ref={filePickerRef}
                                                        />
                                                    </button>

                                                    <button
                                                        className="active:scale-[.94] p-2 active:duration-75 transition-all hover:bg-gray-100 rounded-full flex gap-2"
                                                        onClick={() => setShowEmojis(!showEmojis)}
                                                    >
                                                        <EmojiHappyIcon className="h-6 w-6 text-[#FE9A66]" />
                                                        <p className="font-medium text-[15px] text-[#5C6A80] ">Emoji</p>
                                                    </button>

                                                    {showEmojis && <Picker data={data} onEmojiSelect={addEmoji} />}
                                                </div>
                                            </div>

                                            <div className="md:col-span-6">
                                                {selectedFile ? (
                                                    <div className="relative">
                                                        <div
                                                            className="absolute w-8 h-8 bg-opacity-75 rounded-full flex items-center justify-center top-4 left-1 cursor-pointer"
                                                            onClick={() => setSelectedFile(null)}
                                                        >
                                                            <XIcon className="h-5 w-5 p-1 ml-2 bg-white rounded-full text-gray-700" />
                                                        </div>
                                                        <img
                                                            src={selectedFile}
                                                            alt=""
                                                            className="rounded-2xl mt-3 justify-center max-h-80 object-contain "
                                                        />
                                                    </div>
                                                ) : postData?.imageUrl ? (
                                                    <Image
                                                        src={postData?.imageUrl}
                                                        className="rounded-xl cursor-pointer max-h-[360px] object-cover "
                                                        alt=""
                                                        isblurred="true"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onEditClose}>
                                        <div className="text-[15px] font-medium">Đóng</div>
                                    </Button>
                                    <Button
                                        color="secondary"
                                        isDisabled={(!inputUpdate && !selectedFile) || updatePostMutation.isPending}
                                        onClick={updatePost}
                                    >
                                        <div className="text-[15px] font-medium">
                                            {updatePostMutation.isPending ? (
                                                <div className="flex items-center px-6 justify-center w-6 h-6">
                                                    <CircularProgress
                                                        size="sm"
                                                        color="secondary"
                                                        aria-label="Loading..."
                                                    />
                                                </div>
                                            ) : (
                                                "Xác nhận"
                                            )}
                                        </div>
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Content */}
                <div className="mt-4">
                    <p className="text-[#000000] text-[15px] sm:text-base">{postData?.content}</p>
                    <div className="max-h-[380px]">
                        {postData?.imageUrl ? (
                            <Skeleton isLoaded={isLoaded}>
                                <PhotoProvider
                                    toolbarRender={({ onScale, scale, rotate, onRotate }) => {
                                        return (
                                            <div className="flex text-2xl mx-10">
                                                <BsZoomIn
                                                    className="cursor-pointer"
                                                    onClick={() => onScale(scale + 1)}
                                                />
                                                <BsZoomOut
                                                    className="mx-8 cursor-pointer"
                                                    onClick={() => onScale(scale - 1)}
                                                />
                                                <RxReload
                                                    className="cursor-pointer"
                                                    onClick={() => onRotate(rotate + 90)}
                                                />
                                            </div>
                                        );
                                    }}
                                >
                                    <PhotoView src={postData?.imageUrl}>
                                        <Image
                                            src={postData?.imageUrl}
                                            className="rounded-xl cursor-pointer max-h-[360px] object-cover mt-4"
                                            alt=""
                                            isblurred="true"
                                            width={1000}
                                            height={1000}
                                        />
                                    </PhotoView>
                                </PhotoProvider>
                            </Skeleton>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                {/* Metadata */}
                <div className="mt-4 border-b-2 border-gray-100"></div>
                <div className="flex items-center justify-between mx-4 mt-1">
                    <div className="w-full">
                        {isLiked ? (
                            <Button
                                className="flex items-center gap-2 cursor-pointer w-full"
                                variant="light"
                                onClick={handleLikeClick}
                            >
                                {isLiked ? (
                                    <PiHeartFill className="cursor-pointer h-6 w-6 text-violet-500 active:scale-[.90] active:duration-75 transition-all hover:text-violet-500" />
                                ) : (
                                    <PiHeartBold className="cursor-pointer h-6 w-6 text-gray-700 active:scale-[.84] active:duration-75 transition-all hover:text-violet-500" />
                                )}
                                <p className="text-[15px] font-medium text-gray-700">
                                    <span className="">{usersLike?.length}</span> Like
                                </p>
                            </Button>
                        ) : (
                            <Button
                                className="flex items-center gap-2 cursor-pointer w-full"
                                variant="light"
                                onClick={handleLikeClick}
                            >
                                <PiHeartBold className="cursor-pointer h-6 w-6 text-gray-700 active:scale-[.84] active:duration-75 transition-all hover:text-violet-500" />
                                <p className="text-[15px] font-medium text-gray-700">
                                    <span className="">{usersLike?.length}</span> Like
                                </p>
                            </Button>
                        )}
                    </div>

                    <Button
                        className="flex items-center gap-2 cursor-pointer w-full active:scale-[.94] active:duration-75 transition-all justify-center hover:bg-gray-100 rounded-xl p-2 px-6"
                        variant="light"
                        onClick={toggleCommentSection}
                    >
                        <PiChatCircleBold className="cursor-pointer h-6 w-6 text-gray-700" />
                        <p className="text-[15px] font-medium text-gray-700">
                            <span>{totalComment}</span> Comment
                        </p>
                    </Button>

                    {variant === "group" ? null : (
                        <Button
                            className="flex items-center gap-2 cursor-pointer w-full active:scale-[.94] active:duration-75 transition-all justify-center hover:bg-gray-100 rounded-xl p-2 px-6"
                            variant="light"
                            onPress={onOpen}
                        >
                            <PiDogBold className="cursor-pointer h-6 w-6 text-gray-700" />
                            <p className="text-[15px] font-medium text-gray-700">
                                <span className="">{postData?.pets?.length}</span> Pet
                            </p>
                        </Button>
                    )}

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
                                                        petInfo={pet.breed}
                                                        path={`/pets/${pet._id}`}
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
                    className={`comment-section  ${
                        commentData && commentData.length > 0 ? "mt-4" : ""
                    } antialiased w-full space-y-3 ${isCommentSectionVisible ? "" : "hidden"}`}
                >
                    {commentDataTemp?.map((comment) => {
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
                                removeCommentById={removeCommentById}
                                getCommentsByPost={getCommentsByPost}
                                getTotalCommentCount={getTotalCommentCount}
                                commentPosition={position}
                            />
                        );
                    })}

                    <div
                        onClick={handleLoadComment}
                        className={`text-center text-[14px] font-semibold ${
                            commentData > 0 ? "my-4 pt-2" : ""
                        }  text-gray-700 cursor-pointer`}
                    >
                        {totalCommentParent > 3 && (mutationComment.isPending ? <Loading /> : "Tải thêm bình luận")}
                    </div>
                </div>

                {/* Comment Input */}
                <div className="flex space-x-4 mt-4">
                    <Image
                        className="rounded-full cursor-pointer w-11 h-11"
                        src={userStore.avatar ? userStore.avatar : defaultAvatar}
                        alt="avatar"
                        width={100}
                        height={100}
                    />

                    <div className="w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                className="bg-[#f8f8f9] px-4 p-1 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[43px]"
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
