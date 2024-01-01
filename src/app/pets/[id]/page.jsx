"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Head from "next/head";
import { TbHeartFilled } from "react-icons/tb";
import PostCard from "../../../components/PostCard";
import defaultPetAvatar from "/src/img/default-pet-avatar.png";
import { Select, SelectItem, Avatar, CircularProgress } from "@nextui-org/react";
import Datepicker from "tailwind-datepicker-react";
import Image from "next/image";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import PetService from "../../../core/services/pet.service";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImageStorage } from "../../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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
        month: "long",
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

    const [petData, setPetData] = useState(null);
    const [age, setAge] = useState(null);
    const [petAvatar, setPetAvatar] = useState();
    const [listPostPet, setListPostPet] = useState([]);
    const [countLike, setCountLike] = useState();

    const params = useParams();
    const petId = params.id;

    useEffect(() => {
        getPetById();
        getPostsPet();
    }, []);

    const getPetById = async () => {
        const { data } = await PetService.getPetById(petId);
        if (data) {
            setPetData(data);
            setIsLiked(data.isLiked);
            setCountLike(data.likes.length);

            setPetName(data.name);
            setBreed(data.breed);
            setBio(data.bio);
            setPetAvatar(data.avatar);
            setSelectedSex(data.sex);
            setSelectedSpecies(data.species);

            const dateObject = new Date(data.birthday);
            setValueDate(dateObject);

            const ageOfPet = calculateAge(data.birthday);

            setAge(ageOfPet);
        }
    };

    const getPostsPet = async () => {
        const result = await PetService.getPostsPet(petId);
        setListPostPet(result.data);
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

    // Date picker
    const [show, setShow] = useState(false);

    const handleDateChange = (date) => {
        setValueDate(date);
    };

    const handleClose = (state) => {
        setShow(state);
    };

    const likePetMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PetService.likePet(data);
            return result.data;
        },
        onSuccess: (data) => {
            setCountLike(data.likes.length);
            setIsLiked(data.isLiked);
            data.isLiked == true ? toast.success("Đã thích") : toast.success("Đã huỷ thích");
        },
    });

    const handleButtonClick = async () => {
        likePetMutation.mutate(petId);
    };

    const router = useRouter();

    const handleNavigateUserProfile = () => {
        router.push(`/profile/${petData?.user._id}`);
    };

    const updatePetMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PetService.updatPet(petId, data);
            return result.data;
        },
        onSuccess: (data) => {
            toast.success("Cập nhập thành công");
            setPetData(data);
            onClose();
        },
    });

    const handleUpdatePet = async () => {
        let body;

        const originalDate = new Date(valueDate);
        const utcDate = new Date(originalDate.toUTCString());

        const birthday = utcDate;

        const imageRef = ref(ImageStorage, `pets/${petData?.user._id}/images/${Date.now()}`);
        if (selectedImage) {
            await uploadString(imageRef, selectedImage, "data_url").then(async (value) => {
                const downloadURL = await getDownloadURL(value.ref);
                body = {
                    name: petName,
                    species: selectedSpecies,
                    breed: breed,
                    bio: bio,
                    birthday: birthday,
                    avatar: downloadURL,
                    sex: selectedSex,
                };
            });
        } else {
            body = {
                name: petName,
                species: selectedSpecies,
                breed: breed,
                bio: bio,
                birthday: birthday,
                avatar: petData?.avatar ? petData?.avatar : defaultPetAvatar.src,
                sex: selectedSex,
            };
        }

        updatePetMutation.mutate(body);
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main>
                <div className="flex flex-col p-6 justify-center items-center">
                    <div className="relative flex flex-col items-center p-6 bg-white shadow-sm border-1 rounded-t-2xl xl:w-[70%] lg:w-[70%] md:w-full sm:w-full">
                        <button
                            className="cursor-pointer absolute left-6 text-sm font-medium flex justify-start bg-gray-100 p-1.5 rounded-full pl-3"
                            onClick={handleNavigateUserProfile}
                        >
                            Thú cưng của
                            <img
                                alt="profile"
                                src={petData?.user.avatar}
                                className="object-cover h-6 w-6 ml-4 rounded-full"
                            />
                        </button>
                        <div className="">
                            <img alt="profile" src={petData?.avatar} className="object-cover h-32 w-32 rounded-full" />
                        </div>

                        <div className="flex flex-col mt-3 text-center">
                            <div className="text-xl font-semibold">{petData?.name}</div>
                            <div className="text-sm text-gray-500 ">{petData?.species}</div>
                            <div className="text-[15px] py-2">{petData?.bio}</div>
                            <div className="flex items-center justify-center mt-2">
                                <div className="flex  mx-6 divide-x divide-gray-300 items-center mt-2 mb-2 justify-start">
                                    <div className="flex flex-col px-5 justify-center">
                                        <span className="text-md font-semibold flex flex-col text-center">
                                            {petData?.sex === "male" ? "Đực" : "Cái"}
                                        </span>
                                        <div className="text-sm font-medium text-gray-400">Giới tính</div>
                                    </div>
                                    <div className="flex flex-col px-5 justify-center text-center">
                                        <span className="text-md font-semibold flex flex-col ">{age}</span>
                                        <div className="text-sm font-medium text-gray-400">Tuổi</div>
                                    </div>
                                    <div className="flex flex-col px-5 backdrop:justify-center">
                                        <span className="text-md font-semibold flex flex-col text-center">
                                            {countLike}
                                        </span>
                                        <div className="text-sm font-medium text-gray-400">Lượt thích</div>
                                    </div>
                                </div>
                                <button
                                    className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2.5 text-[15px] px-4 h-fit rounded-full mr-4"
                                    onClick={onOpen}
                                >
                                    Cập nhật thông tin
                                </button>

                                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl">
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    Thông tin thú cưng
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div className="flex w-full mb-4">
                                                        <Image
                                                            src={selectedImage ? selectedImage : petAvatar}
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
                                                                Lưu ý: Chỉ tải lên ảnh có kích thước nhỏ hơn 5MB. Định
                                                                dạng hỗ trợ: JPG, PNG, JPEG.
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
                                                                    value={petName}
                                                                    onChange={(e) => setPetName(e.target.value)}
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
                                                                    // value={selectedSpecies}
                                                                    defaultSelectedKeys={[`${selectedSpecies}`]}
                                                                    onChange={(e) => setSelectedSpecies(e.target.value)}
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
                                                                    value={breed}
                                                                    onChange={(e) => setBreed(e.target.value)}
                                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                                                />
                                                            </div>

                                                            <div className="md:col-span-3">
                                                                <label for="birthday" className="font-medium mb-1">
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
                                                                    // value={selectedSex}
                                                                    defaultSelectedKeys={[`${selectedSex}`]}
                                                                    onChange={(e) => setSelectedSex(e.target.value)}
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
                                                                    value={bio}
                                                                    onChange={(e) => setBio(e.target.value)}
                                                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                                                                    placeholder="Mô tả về thú cưng của bạn."
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        <div className="text-[15px] font-medium">Đóng</div>
                                                    </Button>
                                                    {updatePetMutation.isPending ? (
                                                        <div className="flex items-center px-6 justify-center w-12 h-12">
                                                            <CircularProgress
                                                                size="sm"
                                                                color="secondary"
                                                                aria-label="Loading..."
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Button color="secondary" onClick={handleUpdatePet}>
                                                            <div className="text-[15px] font-medium">Xác nhận</div>
                                                        </Button>
                                                    )}
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                                <button
                                    className={`${
                                        isLiked ? "text-white bg-violet-500" : " bg-violet-50 text-violet-300"
                                    } active:scale-[.94] active:duration-75 transition-all font-medium p-2 rounded-full md:text-base h-fit`}
                                    onClick={handleButtonClick}
                                >
                                    <TbHeartFilled className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full ">
                        {listPostPet?.map((post) => {
                            return (
                                <PostCard
                                    key={post._id}
                                    postId={post._id}
                                    // isUserFollowing={post?.isFollowing}
                                    isUserLiked={post?.isLiked}
                                    // socket={socket}
                                    // handleGetTimeLine={getTimeLine}
                                    // handleResetPage={resetPage}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}

export default profile;

const calculateAge = (birthday) => {
    const currentDate = new Date();
    const birthDate = new Date(birthday);

    const ageInMonths =
        (currentDate.getFullYear() - birthDate.getFullYear()) * 12 + (currentDate.getMonth() - birthDate.getMonth());

    if (ageInMonths < 1) {
        // Nếu tuổi nhỏ hơn 1 tháng, tính tuổi theo số ngày
        const oneDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày
        const ageInDays = Math.round((currentDate - birthDate) / oneDay);
        return ageInDays + " ngày";
    } else {
        // Nếu tuổi lớn hơn hoặc bằng 1 tháng, trả về tuổi theo số tháng
        return ageInMonths + " tháng";
    }
};
