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

function group() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [selectedImage, setSelectedImage] = useState(null);

    const [groupName, setGroupName] = useState(null);
    const [groupDesc, setGroupDesc] = useState(null);
    const [selectedUser, setSelectedUser] = React.useState(new Set([]));
    const [listGroups, setListGroups] = useState([]);

    const handleUserSelection = (e) => {
        setSelectedUser(new Set(e.target.value.split(",")));
    };

  const fileInputRef = useRef(null);

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleUpdateButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        getGroupsByUserLogin();
    }, []);

    const getGroupsByUserLogin = async () => {
        const { data } = await GroupService.getGroupsByUserLogin();
        setListGroups(data);
    };

    const handleFilter = async (key) => {
        console.log(key);
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
                                <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-1 w-[]">
                                    <SearchIcon className="h-4 ml-2 text-gray-500" />
                                    <input
                                        className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                                        type="text"
                                        placeholder="Tìm kiếm theo tên"
                                    ></input>
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
                              renderValue={(items) => {
                                return items.map((item, index) => (
                                  <>
                                    {index > 0 && ", "}
                                    {item.value}
                                  </>
                                ));
                              }}
                            >
                              <SelectItem key="Daniel de Waal" value="Daniel de Waal">
                                <div className="flex gap-2 items-center">
                                  <Avatar
                                    alt="Daniel"
                                    className="flex-shrink-0"
                                    size="sm"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-small">Daniel de Waal</span>
                                    <span className="text-tiny text-default-400">
                                      danieldewaal@gmail.com
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>

                              <SelectItem key="Lisa Beck" value="Lisa Beck">
                                <div className="flex gap-2 items-center">
                                  <Avatar
                                    alt="Lisa"
                                    className="flex-shrink-0"
                                    size="sm"
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  />
                                  <div className="flex flex-col">
                                  <span className="text-small">Lisa Beck</span>
                                    <span className="text-tiny text-default-400">
                                      lisa@gmail.com
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>

                              <SelectItem key="Calum Scott" value="Calum Scott">
                                <div className="flex gap-2 items-center">
                                  <Avatar
                                    alt="Calum"
                                    className="flex-shrink-0"
                                    size="sm"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-small">Calum Scott</span>
                                    <span className="text-tiny text-default-400">
                                      calumscott@gmail.com
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>

                            </Select>
                            <p className="text-small text-default-500 py-3">Thành viên đã chọn: {Array.from(selectedUser).join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        <div className="text-[15px] font-medium">Đóng</div>
                      </Button>
                      <Button color="secondary">
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
                                {listGroups?.map((group) => {
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
                                })}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center pt-2">
                            <Pagination
                                isCompact
                                showControls
                                key="following"
                                total={10}
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

export default React.memo(group);
