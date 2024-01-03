"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Head from "next/head";
import { TbHeartFilled } from "react-icons/tb";
import PostCard from "../../../components/PostCard";
import testAvatar from "../../../img/test-avatar.jpg";
import testAvatar2 from "../../../img/test-avatar2.jpg";
import InputBox from "../../../components/InputBox";
import defaultGroupAvatar from "/src/img/default-group-avatar.png";
import { Select, SelectItem } from "@nextui-org/react";
import Datepicker from "tailwind-datepicker-react";
import Image from "next/image";
import UserCard from "../../../utils/UserCard";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Link from "next/link";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useParams } from "next/navigation";
import GroupService from "../../../core/services/group.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImageStorage } from "../../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Loading from "../../../components/share/loading";

function groupid() {
    const params = useParams();
    const groupId = params.id;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onOpenChange: onAddOpenChange,
        onClose: onAddClose,
    } = useDisclosure();

    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const [groupName, setGroupName] = useState(null);
    const [groupDesc, setGroupDesc] = useState(null);
    const [groupAvatar, setGroupAvatar] = useState(null);

    const [selectedUser, setSelectedUser] = React.useState([]);

    const [groupData, setGroupData] = useState(null);
    const [listMembers, setListMembers] = useState([]);
    const [listPost, setListPost] = useState([]);
    const [listUserInvite, setListUserInvite] = useState([]);
    const [page, setPage] = useState(2);

    useEffect(() => {
        getGroupById();
        getPostsFromGroup();
        getListUserInviteOfGroup();
    }, []);

    useEffect(() => {
        getMembers();
    }, [groupData]);

    const getListUserInviteOfGroup = async () => {
        const { data } = await GroupService.getListUserInviteOfGroup(groupId);
        setListUserInvite(data);
    };

    const getGroupById = async () => {
        const { data } = await GroupService.getGroupById(groupId);
        setGroupData(data);
        setGroupAvatar(data.avatar);
        setGroupName(data.name);
        setGroupDesc(data.describe);
    };

    const getPostsFromGroup = async () => {
        const body = { group_id: groupId };
        const { data } = await GroupService.getPostsFromGroup(body);
        setListPost(data);
    };

    const resetPage = async () => {
        await setPage(2);
    };

    const mutation = useMutation({
        mutationFn: async (data) => {
            const body = { group_id: groupId, page: data };
            const result = await GroupService.getPostsFromGroup(body);
            return result.data;
        },
        onSuccess: async (data) => {
            await setListPost((preList) => [...preList, ...data]);
            await setPage((prevPage) => prevPage + 1);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        // Check if the user has scrolled to the bottom 10% of the page
        if (scrollPosition > documentHeight - windowHeight * 1.5 && !mutation.isPending) {
            mutation.mutate(page);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const getMembers = async () => {
        const body = { members: groupData?.members };
        const { data } = await GroupService.getMembers(body);
        setListMembers(data);
    };

    const handleUserSelection = (selectedKeys) => {
        if (selectedKeys.isSelected === true) {
            setSelectedUser((prevUsers) => [...prevUsers, selectedKeys.userId]);
        } else {
            setSelectedUser((prevUsers) => prevUsers.filter((user) => user !== selectedKeys.userId));
        }
    };

    const addUserMutation = useMutation({
        mutationFn: async (data) => {
            const result = await GroupService.addUserToGroup(data);
            return result.data;
        },
        onSuccess: async () => {
            await toast.success("Đã thêm");
            await onAddClose();
            await getMembers();
        },
    });

    const addUserToGroup = async () => {
        const body = { groupId: groupId, users: selectedUser };
        addUserMutation.mutate(body);
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedImage(readerEvent.target.result);
        };
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleUpdateButtonClick = () => {
        fileInputRef.current.click();
    };

    const updateProfleMutation = useMutation({
        mutationFn: async (data) => {
            const result = await GroupService.updateProfileGroup(data);
            return result.data;
        },
        onSuccess: (data) => {
            toast.success("Cập nhật thành công");
            setGroupData(data);
            onClose();
        },
    });

    const handleUpdateProfile = async () => {
        let body;

        const imageRef = ref(ImageStorage, `groups/${groupData?._id}/images/${Date.now()}`);
        if (selectedImage) {
            await uploadString(imageRef, selectedImage, "data_url").then(async (value) => {
                const downloadURL = await getDownloadURL(value.ref);
                body = {
                    group_id: groupId,
                    name: groupName,
                    avatar: downloadURL,
                    describe: groupDesc,
                };
            });
        } else {
            body = {
                group_id: groupId,
                name: groupName,
                avatar: groupAvatar,
                describe: groupDesc,
            };
        }

        updateProfleMutation.mutate(body);
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main>
                <div className="flex grid-cols-2 px-6 pl-0 justify-center">
                    <div className="xl:w-[70%] lg:w-[70%] md:w-full  flex flex-col p-6 justify-center items-center">
                        <div className="flex items-start p-6 bg-white shadow-sm border-1 rounded-2xl sm:w-full space-x-5">
                            <div className="w-fit">
                                <div className="w-48 h-48">
                                    <img
                                        alt="profile"
                                        src={groupData?.avatar}
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mt-3 w-full text-left">
                                <div className="text-xl font-semibold">{groupData?.name}</div>
                                <div className="text-sm text-gray-500">
                                    <span>{groupData?.members.length}</span> thành viên
                                </div>
                                <div className="text-[15px] h-[40%] py-3">{groupData?.describe}</div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex space-x-4 items-center">
                                        <div className="avatar-group">
                                            <AvatarGroup size="sm" isBordered max={3}>
                                                {listMembers?.map((member) => {
                                                    return (
                                                        <Avatar
                                                            key={member.user._id}
                                                            size="sm"
                                                            src={member.user.avatar}
                                                        />
                                                    );
                                                })}
                                            </AvatarGroup>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2.5 text-[15px] px-4 h-fit rounded-full "
                                            onClick={onOpen}
                                        >
                                            Cập nhật thông tin
                                        </button>

                                        {/* Update Info Modal */}
                                        <Modal
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                            isDismissable={false}
                                            size="3xl"
                                        >
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">
                                                            Thông tin nhóm
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <div className="flex w-full mb-4">
                                                                <Image
                                                                    src={selectedImage ? selectedImage : groupAvatar}
                                                                    className="h-28 w-28 rounded-xl object-cover"
                                                                    width={128}
                                                                    height={128}
                                                                    quality={100}
                                                                    alt="petAvatar"
                                                                />
                                                                <div className="ml-6">
                                                                    <button
                                                                        className="w-fit bg-violet-600 text-white text-[15px] font-medium rounded-xl p-2 px-4 mb-2 cursor-pointer"
                                                                        onClick={handleUpdateButtonClick}
                                                                    >
                                                                        Cập nhật ảnh đại diện
                                                                        <input
                                                                            type="file"
                                                                            hidden
                                                                            onChange={handleImageChange}
                                                                            ref={fileInputRef}
                                                                        />
                                                                    </button>
                                                                    {selectedImage && (
                                                                        <button
                                                                            className="bg-red-500 text-white text-[15px] font-medium rounded-xl p-2 px-4 mb-2 ml-2"
                                                                            onClick={handleRemoveImage}
                                                                        >
                                                                            Gỡ ảnh
                                                                        </button>
                                                                    )}
                                                                    <div className="text-sm text-gray-500 max-w-sm">
                                                                        Lưu ý: Chỉ tải lên ảnh có kích thước nhỏ hơn
                                                                        5MB. Định dạng hỗ trợ: JPG, PNG, JPEG.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="lg:col-span-2">
                                                                <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                                                                    <div className="md:col-span-6">
                                                                        <label for="pet_name" className="font-medium">
                                                                            Tên nhóm
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="pet_name"
                                                                            value={groupName}
                                                                            onChange={(e) =>
                                                                                setGroupName(e.target.value)
                                                                            }
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                                                        />
                                                                    </div>

                                                                    <div className="md:col-span-6">
                                                                        <label for="bio" className="font-medium">
                                                                            Giới thiệu
                                                                        </label>
                                                                        <textarea
                                                                            id="bio"
                                                                            rows="3"
                                                                            value={groupDesc}
                                                                            onChange={(e) =>
                                                                                setGroupDesc(e.target.value)
                                                                            }
                                                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                                                                            placeholder="Mô tả về nhóm của bạn."
                                                                        ></textarea>
                                                                    </div>

                                                                    {/* <div className="md:col-span-6">
                                    <label
                                      for="species"
                                      className="font-medium"
                                    >
                                      Thành viên nhóm{" "}
                                      <span className="text-gray-500">
                                        (Nhóm phải có tối thiểu 3 thành viên)
                                      </span>
                                    </label>
                                  </div> */}
                                                                </div>
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="danger" variant="light" onPress={onClose}>
                                                                <div className="text-[15px] font-medium">Đóng</div>
                                                            </Button>
                                                            <Button color="secondary" onClick={handleUpdateProfile}>
                                                                {updateProfleMutation.isPending ? (
                                                                    <Loading />
                                                                ) : (
                                                                    <div className="text-[15px] font-medium">
                                                                        Xác nhận
                                                                    </div>
                                                                )}
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>

                                        <button
                                            className="bg-gray-100 text-gray-600 active:scale-[.94] active:duration-75 transition-all font-medium p-2.5 text-[15px] px-4 h-fit rounded-full "
                                            onClick={onAddOpen}
                                        >
                                            Thêm người
                                        </button>

                                        <Modal
                                            isOpen={isAddOpen}
                                            onOpenChange={onAddOpenChange}
                                            isDismissable={false}
                                            size="lg"
                                        >
                                            <ModalContent>
                                                {(onAddClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">
                                                            Mời thêm người
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <div className="gap-y-2 divide-y divide-gray-200">
                                                                {listUserInvite.map((user) => {
                                                                    return (
                                                                        <UserCard
                                                                            key={user._id}
                                                                            userId={user._id}
                                                                            userName={
                                                                                user.lastName + " " + user.firstName
                                                                            }
                                                                            userAvatar={user.avatar}
                                                                            userEmail={user.email}
                                                                            handleOnSelected={handleUserSelection}
                                                                            variant="adduser"
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="danger" variant="light" onPress={onAddClose}>
                                                                <div className="text-[15px] font-medium">Đóng</div>
                                                            </Button>
                                                            <Button color="secondary">
                                                                <div
                                                                    className="text-[15px] font-medium"
                                                                    onClick={addUserToGroup}
                                                                >
                                                                    {addUserMutation.isPending ? <Loading /> : "Xác nhận"}
                                                                </div>
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:w-full mt-6">
                            <InputBox
                                variant="group"
                                groupId={groupId}
                                handleGetTimeLine={getPostsFromGroup}
                                handleResetPage={resetPage}
                            />
                            {listPost?.map((post) => {
                                return (
                                    <PostCard
                                        variant="group"
                                        key={post._id}
                                        postId={post._id}
                                        isUserFollowing={post?.isFollowing}
                                        isUserLiked={post?.isLiked}
                                        handleGetTimeLine={getPostsFromGroup}
                                        handleResetPage={resetPage}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="min-w-[30%] lg:flex xl:flex md:hidden sm:hidden">
                        <div className="py-6 flex-shrink-0 space-y-8 w-full">
                            <div className="p-2 rounded-xl bg-white shadow-sm border-1">
                                <h4 className="font-semibold text-xl px-4 py-2">Thành viên group</h4>

                                {/* Users */}
                                <div className="mb-4 space-y-2 max-h-[420px] overflow-y-auto">
                                    {/* {listMembers?.map((member) => {
                                        return (
                                            <UserCard
                                                key={member.user._id}
                                                userId={member.user._id}
                                                userName={member.user.lastName + " " + member.user.firstName}
                                                userAvatar={member.user.avatar}
                                                follower={member.totalFollowers}
                                                leader = {member.isLeader}
                                                variant="group"
                                            />
                                        );
                                    })} */}

                                    <UserCard
                                        userName="Huong Lua Nguyen"
                                        userAvatar={testAvatar2}
                                        follower="1K"
                                        variant="group"
                                    />

<UserCard
                                        userName="Huong Lua Nguyen"
                                        userAvatar={testAvatar2}
                                        follower="1K"
                                        variant="group"
                                    />
                                    <UserCard
                                        userName="Huong Lua Nguyen"
                                        userAvatar={testAvatar2}
                                        follower="1K"
                                        variant="group"
                                    />
                                    <UserCard
                                        userName="Huong Lua Nguyen"
                                        userAvatar={testAvatar2}
                                        follower="1K"
                                        variant="group"
                                    />
                                    <UserCard
                                        userName="Huong Lua Nguyen"
                                        userAvatar={testAvatar2}
                                        follower="1K"
                                        variant="group"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default groupid;
