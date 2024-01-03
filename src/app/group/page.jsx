"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";
import ProfileCard from "../../components/ProfileCard";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { HiPlus } from "react-icons/hi";
import PetProfileCard from "../../components/PetProfileCard";
import defaultGroupAvatar from "/src/img/default-group-avatar.png";
import GroupCard from "../../components/GroupCard";
import GroupService from "../../core/services/group.service.js";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImageStorage } from "../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Loading from "../../components/share/loading.js";
import FindingBox from "../../components/share/finding-box";
import withAuth from "../../middleware/withAuth";

function group() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [selectedImage, setSelectedImage] = useState(null);

    const [groupName, setGroupName] = useState(null);
    const [groupDesc, setGroupDesc] = useState(null);
    const [selectedUser, setSelectedUser] = React.useState(new Set([]));
    const [listGroups, setListGroups] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [listUserSelected, setListUserSelected] = useState([]);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [filterKeyword, setFilterKeyword] = useState("");

    const userStoreId = useSelector((state) => state.user.id);
    let newArray = [userStoreId];

    const handleUserSelection = (e) => {
        const selectedUserIdSet = e.values();

        // Use the functional form of setListUserSelected to ensure correctness
        setListUserSelected((prevListUserSelected) => {
            newArray = [...prevListUserSelected];

            // Ensure userStoreId is always present
            if (!newArray.includes(userStoreId)) {
                newArray.push(userStoreId);
            }

            for (const selectedUserId of selectedUserIdSet) {
                const isAlreadySelected = newArray.includes(selectedUserId);

                if (isAlreadySelected) {
                    newArray.splice(newArray.indexOf(selectedUserId), 1);
                } else {
                    newArray.push(selectedUserId);
                }
            }

            return newArray;
        });
    };

    const fileInputRef = useRef(null);

    const handleSelectionChange = (e) => {
        setValues(new Set(e.target.value.split(",")));
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

    useEffect(() => {
        getGroupsByUserLogin();
        getListUserInvite();
    }, []);

    const getGroupsByUserLogin = async () => {
        const { data } = await GroupService.getGroupsByUserLogin();
        setListGroups(data?.groups);
        setTotalPages(data?.totalPages);
    };

    const getListUserInvite = async () => {
        const { data } = await GroupService.getListUserInvite();
        setListUser(data);
    };

    useEffect(() => {
        if (filter !== undefined || page !== undefined) {
            mutationFilter.mutate(filter);
            mutationPagination.mutate(page);
        }
    }, [filter, page]);

    const mutationPagination = useMutation({
        mutationFn: async (response) => {
            const body = { page: response };
            let result;
            if (filter === "all") {
                result = await GroupService.getGroupsByUserLogin(body);
            }
            if (filter === "mygroup") {
                result = await GroupService.getGroupsByOwner(body);
            }
            return result.data;
        },
        onSuccess: (data) => {
            setListGroups(data.groups);
            setTotalPages(data.totalPages);
        },
    });

    const mutationFilter = useMutation({
        mutationFn: async (response) => {
            const body = { page: page };
            let result;
            if (response === "all") {
                result = await GroupService.getGroupsByUserLogin(body);
            }
            if (response === "mygroup") {
                result = await GroupService.getGroupsByOwner(body);
            }
            return result.data;
        },
        onSuccess: (data) => {
            setListGroups(data.groups);
            setTotalPages(data.totalPages);
        },
    });

    const handlePagination = async (page) => {
        await setPage(page);
    };

    const handleFilter = async (key) => {
        await setFilter(key);
        await setPage(1);
    };

    const createGroupMutation = useMutation({
        mutationFn: async (data) => {
            const result = await GroupService.createGroup(data);
            return result.data;
        },
        onSuccess: (data) => {
            toast.success("Tạo thành công ");
            getGroupsByUserLogin();
            onClose();
            setGroupName("");
            setGroupDesc("");
            setSelectedImage("");
            setListUserSelected([]);
        },
    });

    const handleCreateGroup = async () => {
        let body;

        const imageRef = ref(ImageStorage, `groups/images/${Date.now()}`);
        if (selectedImage) {
            await uploadString(imageRef, selectedImage, "data_url").then(async (value) => {
                const downloadURL = await getDownloadURL(value.ref);
                body = {
                    name: groupName,
                    describe: groupDesc,
                    avatar: downloadURL,
                    members: listUserSelected,
                };
            });
        } else {
            body = {
                name: groupName,
                describe: groupDesc,
                avatar: defaultGroupAvatar,
                members: listUserSelected,
            };
        }

        createGroupMutation.mutate(body);
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main>
                <div className="p-6 ">
                    {/* Header */}
                    <div className="text-2xl font-semibold mb-1">Nhóm</div>

                    {/* Controller */}
                    <div className="overflow-y-hidden">
                        {/* Tabs */}
                        <div className="flex justify-between gap-x-4 w-full  h-full my-4">
                            <div className="flex flex-wrap gap-4">
                                <Tabs
                                    onSelectionChange={handleFilter}
                                    key="filter"
                                    color="secondary"
                                    radius="full"
                                    size="lg"
                                >
                                    <Tab key="all" title="Tất cả" />
                                    <Tab key="mygroup" title="Nhóm đã tạo" />
                                </Tabs>
                            </div>

                            <div className="flex space-x-4">
                                {/* Search */}
                                <div className="flex flex-col relative">
                                    <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-3 w-[]">
                                        <SearchIcon className="h-4 ml-2 text-gray-500" />
                                        <input
                                            className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                                            type="text"
                                            value={filterKeyword}
                                            onChange={(e) => setFilterKeyword(e.target.value)}
                                            placeholder="Tìm kiếm theo tên"
                                        ></input>
                                    </div>
                                    <div className="absolute top-8 left-2">
                                        <FindingBox variant="group" keyword={filterKeyword} />
                                    </div>
                                </div>
                                <button
                                    className="flex items-center bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-xl"
                                    onClick={onOpen}
                                >
                                    <HiPlus className="mr-2" />
                                    Tạo nhóm mới
                                </button>
                            </div>
                        </div>

                        {/* Modal Create Group */}
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl">
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Thông tin nhóm</ModalHeader>
                                        <ModalBody>
                                            <div className="flex w-full mb-4">
                                                <Image
                                                    src={selectedImage || defaultGroupAvatar}
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
                                                        Lưu ý: Chỉ tải lên ảnh có kích thước nhỏ hơn 5MB. Định dạng hỗ
                                                        trợ: JPG, PNG, JPEG.
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
                                                            onChange={(e) => setGroupName(e.target.value)}
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
                                                            onChange={(e) => setGroupDesc(e.target.value)}
                                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                                                            placeholder="Mô tả về nhóm của bạn."
                                                        ></textarea>
                                                    </div>

                                                    <div className="md:col-span-6">
                                                        <label for="species" className="font-medium">
                                                            Thành viên nhóm{" "}
                                                            <span className="text-gray-500">
                                                                (Nhóm phải có tối thiểu 3 thành viên)
                                                            </span>
                                                        </label>
                                                        <Select
                                                            radius="sm"
                                                            size="md"
                                                            variant="bordered"
                                                            placeholder="Chọn thành viên"
                                                            selectionMode="multiple"
                                                            labelPlacement="outside"
                                                            className="mt-1 bg-gray-50"
                                                            selectedKeys={selectedUser}
                                                            onSelectionChange={setSelectedUser}
                                                            renderValue={listUserSelected.join(" ,")}
                                                            // renderValue={items.map((item, index) => (
                                                            //   <>
                                                            //     {index > 0 && ", "}
                                                            //     {item.value}
                                                            //   </>
                                                            // ))}
                                                        >
                                                            {listUser?.map((user) => {
                                                                return (
                                                                    <SelectItem key={user._id} value={user.lastName +
                                                                      " " +
                                                                      user.firstName}>
                                                                        <div className="flex gap-2 items-center">
                                                                            <Avatar
                                                                                alt={user._id}
                                                                                className="flex-shrink-0"
                                                                                size="sm"
                                                                                src={user.avatar}
                                                                            />
                                                                            <div className="flex flex-col">
                                                                                <span className="text-small">
                                                                                    {user.lastName +
                                                                                        " " +
                                                                                        user.firstName}
                                                                                </span>
                                                                                <span className="text-tiny text-default-400">
                                                                                    {user.email}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </SelectItem>
                                                                );
                                                            })}
                                                        </Select>
                                                        <p className="text-small text-default-500 py-3">
                                                            Thành viên đã chọn: {Array.from(selectedUser).join(", ")}
    z                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                <div className="text-[15px] font-medium">Đóng</div>
                                            </Button>
                                            <Button color="secondary" onClick={handleCreateGroup}>
                                                <div className="text-[15px] font-medium">Xác nhận</div>
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        {/* Content */}
                        <div className="pb-4 py-3 ">
                            <div className="gap-6 px-6 grid grid-cols-2">
                                {mutationPagination.isPending || mutationFilter.isPending ? (
                                    <Loading />
                                ) : (
                                    listGroups?.map((group) => {
                                        return (
                                            <GroupCard
                                                key={group._id}
                                                groupId={group._id}
                                                groupAvatar={group.avatar}
                                                groupName={group.name}
                                                members={group.members}
                                                describe={group.describe}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center pt-2">
                            <Pagination
                                isCompact
                                showControls
                                key={filter}
                                total={totalPages}
                                onChange={handlePagination}
                                initialPage={1}
                                color="secondary"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default withAuth(React.memo(group));
