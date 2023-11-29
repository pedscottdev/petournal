"use client";
import React from "react";
import { useState, useRef } from "react";
import Head from "next/head";
import { TbHeartFilled } from "react-icons/tb";
import PostCard from "../../../components/PostCard";
import defaultPetAvatar from "/src/img/default-pet-avatar.png";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import Datepicker from "tailwind-datepicker-react"
import Image from "next/image";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

// Date Picker
const options = {
  autoHide: true,
  todayBtn: true,
  clearBtn: false,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-50 ",
    input: "mt-1",
    inputIcon: "mr-4",
    selected: "",
  },
  icons: {
    prev: () => <FaArrowLeft />,
    next: () => <FaArrowRight />,
  },
  datepickerClassNames: "top-12 mt-1",
  defaultDate: new Date("2023-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputPlaceholderProp: "Chọn ngày",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
};

function profile() {
  const [isLiked, setIsLiked] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState(null);
  const [petName, setPetName] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef(null);
  const [valueDate, setValueDate] = useState(null);

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

  // Date picker
  const [show, setShow] = useState(false);

  const handleDateChange = (date) => {
    setValueDate(date);
    const formattedDate = date ? date.toLocaleDateString("en-GB") : "";
    console.log("Selected Date:", formattedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  const handleButtonClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isLiked) {
      alert("Đã yêu thích");
    } else {
      alert("Đã hủy yêu thích");
    }

    setIsLiked((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>


      <main>
        <div className="flex flex-col p-6 justify-center items-center">
          <div className="relative flex flex-col items-center p-6 bg-white shadow-sm border-1 rounded-t-2xl xl:w-[70%] lg:w-[70%] md:w-full sm:w-full">
            <div className="cursor-pointer absolute left-6 text-sm font-medium flex justify-start bg-gray-100 p-1.5 rounded-full pl-3">
              Thú cưng của
              <img
                alt="profile"
                src="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
                className="object-cover h-6 w-6 ml-4 rounded-full"
              />
            </div>
            <div className="">
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover h-32 w-32 rounded-full"
              />
            </div>

            <div className="flex flex-col mt-3 text-center">
              <div className="text-xl font-semibold">Sammy</div>
              <div className="text-sm text-gray-500 ">Chó Anh lông dài</div>
              <div className="text-[15px] py-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                nisi libero ab assumenda eaque accusantium aliquam ut nulla! Ea,
                repudiandae.
              </div>
              <div className="flex items-center justify-center mt-2">
                <div className="flex  mx-6 divide-x divide-gray-300 items-center mt-2 mb-2 justify-start">
                  <div className="flex flex-col px-5 justify-center">
                    <span className="text-md font-semibold flex flex-col text-center">
                      Đực
                    </span>
                    <div className="text-sm font-medium text-gray-400">
                      Giới tính
                    </div>
                  </div>
                  <div className="flex flex-col px-5 justify-center text-center">
                    <span className="text-md font-semibold flex flex-col ">
                      3
                    </span>
                    <div className="text-sm font-medium text-gray-400">
                      Tuổi
                    </div>
                  </div>
                  <div className="flex flex-col px-5 backdrop:justify-center">
                    <span className="text-md font-semibold flex flex-col text-center">
                      48
                    </span>
                    <div className="text-sm font-medium text-gray-400">
                      Lượt thích
                    </div>
                  </div>
                </div>
                <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2.5 text-[15px] px-4 h-fit rounded-full mr-4" onClick={onOpen}>
                  Cập nhật thông tin
                </button>

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
                          Thông tin thú cưng
                        </ModalHeader>
                        <ModalBody>
                          <div className="flex w-full mb-4">
                            <Image
                              src={selectedImage || defaultPetAvatar}
                              className="h-28 w-28 rounded-full object-cover"
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
                                  Tên thú cưng
                                </label>
                                <input
                                  type="text"
                                  id="pet_name"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                />
                              </div>
                              <div className="md:col-span-3">
                                <label for="species" className="font-medium">
                                  Loài
                                </label>
                                <Select
                                  radius="sm"
                                  size="md"
                                  variant="bordered"
                                  placeholder="Chọn loài"
                                  labelPlacement="outside"
                                  className="mt-1 bg-gray-50"
                                  value={selectedSpecies}
                                  onChange={(value) =>
                                    setSelectedSpecies(value)
                                  }
                                >
                                  <SelectItem key="dog" value="dog">
                                    Chó
                                  </SelectItem>
                                  <SelectItem key="cat" value="cat">
                                    Mèo
                                  </SelectItem>
                                  <SelectItem key="other" value="other">
                                    Khác
                                  </SelectItem>
                                </Select>
                              </div>

                              <div className="md:col-span-3">
                                <label for="variables" className="font-medium">
                                  Giống
                                </label>
                                <input
                                  type="text"
                                  id="variables"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                />
                              </div>

                              <div className="md:col-span-3">
                                <label
                                  for="birthday"
                                  className="font-medium mb-1"
                                >
                                  Ngày sinh
                                </label>
                                {/* <input
                            type="text"
                            id="birthday"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                          /> */}
                                <Datepicker
                                  className="mt-1"
                                  options={options}
                                  value={valueDate}
                                  onChange={handleDateChange}
                                  show={show}
                                  setShow={handleClose}
                                />
                              </div>

                              <div className="md:col-span-3 h-6">
                                <label for="sex" className="font-medium">
                                  Giới tính
                                </label>
                                <Select
                                  id="sex"
                                  radius="sm"
                                  size="md"
                                  variant="bordered"
                                  placeholder="Chọn giới tính"
                                  labelPlacement="outside"
                                  className="mt-1 bg-gray-50"
                                  value={selectedSex}
                                  onChange={(value) => setSelectedSex(value)}
                                >
                                  <SelectItem key="male" value="male">
                                    Đực
                                  </SelectItem>
                                  <SelectItem key="female" value="female">
                                    Cái
                                  </SelectItem>
                                </Select>
                              </div>

                              <div className="md:col-span-6">
                                <label for="bio" className="font-medium">
                                  Giới thiệu
                                </label>
                                <textarea
                                  id="bio"
                                  rows="3"
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                                  placeholder="Mô tả về thú cưng của bạn."
                                ></textarea>
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
                            <div className="text-[15px] font-medium">Đóng</div>
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
                  className={`${
                    isLiked
                      ? "bg-violet-50 text-violet-300"
                      : " text-white bg-violet-500"
                  } active:scale-[.94] active:duration-75 transition-all font-medium p-2 rounded-full md:text-base h-fit`}
                  onClick={handleButtonClick}
                >
                  <TbHeartFilled className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full ">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </main>
    </>
  );
}

export default profile;
