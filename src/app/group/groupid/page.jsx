"use client";
import React from "react";
import { useState, useRef } from "react";
import Head from "next/head";
import { TbHeartFilled } from "react-icons/tb";
import PostCard from "../../../components/PostCard";
import InputBox from "../../../components/InputBox";
import defaultGroupAvatar from "/src/img/default-group-avatar.png";
import { Select, SelectItem } from "@nextui-org/react";
import Datepicker from "tailwind-datepicker-react";
import Image from "next/image";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function groupid() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [groupName, setGroupName] = useState(null);
  const [groupDesc, setGroupDesc] = useState(null);
  const [selectedUser, setSelectedUser] = React.useState(new Set([]));

  const handleUserSelection = (selectedKeys) => {
    setSelectedUser(selectedKeys);
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

  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main>
        <div className="flex flex-col p-6 justify-center items-center">
          <div className="flex items-start p-6 bg-white shadow-sm border-1 rounded-2xl xl:w-[70%] lg:w-[70%] md:w-full sm:w-full space-x-5">
            <div className="w-fit">
              <div className="w-48 h-48">
                <img
                  alt="profile"
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 text-left">
              <div className="text-xl font-semibold">
                Hội những người yêu chó shiba
              </div>
              <div className="text-sm text-gray-500">
                <span>32</span> thành viên
              </div>
              <div className="text-[15px] py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                nisi libero ab assumenda eaque accusantium aliquam ut nulla! Ea,
                repudiandae.
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-4 items-center">
                  <div className="avatar-group">
                    <AvatarGroup size="sm" isBordered max={3}>
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      />
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                      />
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                      <Avatar
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                      />
                    </AvatarGroup>
                  </div>
                </div>
                <div className="flex space-x-5">
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
                                    onChange={handleUserSelection}
                                  >
                                    <SelectItem key="Daniel de Waal">
                                      <div className="flex gap-2 items-center">
                                        <Avatar
                                          alt="Daniel"
                                          className="flex-shrink-0"
                                          size="sm"
                                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <div className="flex flex-col">
                                          <span className="text-small">
                                            Daniel de Waal
                                          </span>
                                          <span className="text-tiny text-default-400">
                                            danieldewaal@gmail.com
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>

                                    <SelectItem key="Lisa Beck">
                                      <div className="flex gap-2 items-center">
                                        <Avatar
                                          alt="Lisa"
                                          className="flex-shrink-0"
                                          size="sm"
                                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <div className="flex flex-col">
                                          <span className="text-small">
                                            Lisa Beck
                                          </span>
                                          <span className="text-tiny text-default-400">
                                            lisa@gmail.com
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>

                                    <SelectItem key="Calum Scott">
                                      <div className="flex gap-2 items-center">
                                        <Avatar
                                          alt="Calum"
                                          className="flex-shrink-0"
                                          size="sm"
                                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <div className="flex flex-col">
                                          <span className="text-small">
                                            Calum Scott
                                          </span>
                                          <span className="text-tiny text-default-400">
                                            calumscott@gmail.com
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  </Select>
                                  <p className="text-small text-default-500 py-3">
                                    Thành viên đã thêm:{" "}
                                    {selectedUser.join(', ')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              <div className="text-[15px] font-medium">
                                Đóng
                              </div>
                            </Button>
                            <Button color="secondary">
                              <div className="text-[15px] font-medium">
                                Xác nhận
                              </div>
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>

                  <button
                    className="bg-gray-100 text-gray-600 active:scale-[.94] active:duration-75 transition-all font-medium p-2.5 text-[15px] px-4 h-fit rounded-full "
                    onClick={isAddOpen}
                  >
                    Thêm người
                  </button>

                  <Modal isOpen={isAddOpen} isDismissable={false} size="lg">
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Mời thêm người
                          </ModalHeader>
                          <ModalBody>
                            <div>
                              <div></div>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onAddClose}
                            >
                              <div className="text-[15px] font-medium">
                                Đóng
                              </div>
                            </Button>
                            <Button color="secondary">
                              <div className="text-[15px] font-medium">
                                Xác nhận
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

          <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full mt-6">
            <InputBox variant="group" />
            <PostCard variant="group" />
            <PostCard variant="group" />
            <PostCard variant="group" />
            <PostCard variant="group" />
          </div>
        </div>
      </main>
    </>
  );
}

export default groupid;
