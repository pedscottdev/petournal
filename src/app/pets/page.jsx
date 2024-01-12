"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import defaultPetAvatar from "/src/img/default-pet-avatar.png";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { Tabs, Tab, Chip, Card, CardBody, CircularProgress } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";
import PetProfileCard from "../../components/PetProfileCard";
import { HiPlus } from "react-icons/hi";
import Datepicker from "tailwind-datepicker-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import PetService from "../../core/services/pet.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import { ImageStorage } from "../../../firebase";
import { useSelector } from "react-redux";
import FindingBox from "../../components/share/finding-box";
import withAuth from "../../middleware/withAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorField from "../../components/share/error-field";

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

const PetSchema = yup.object().shape({
    petName: yup.string().required("Vui lòng nhập tên thú cưng").max(255),
    species: yup.string().required("Vui chọn loài thú cưng"),
    breed: yup.string().max(255).required("Vui chọn giống thú cưng"),
    sex: yup.string().required("Vui chọn giới tính thú cưng"),
    bio: yup.string().max(500).required("Vui nhập giới thiệu thú cưng"),
});

function pets() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const userStore = useSelector((state) => state.user);

    const [selectedImage, setSelectedImage] = useState(null);
    const [petName, setPetName] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [breed, setBreed] = useState("");
    // const [age, setAge] = useState();
    const [selectedSex, setSelectedSex] = useState("");
    const [bio, setBio] = useState("");
    const fileInputRef = useRef(null);
    const [valueDate, setValueDate] = useState(null);

    const [petsData, setPetsData] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [totalPages, setTotalPages] = useState();
    const [filterKeyword, setFilterKeyword] = useState("");

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

    useEffect(() => {
        getPetsByUserLoginPagination();
    }, []);

    const getPetsByUserLoginPagination = async () => {
        const { data } = await PetService.getPetsByUserLoginPagination();
        setTotalPages(data?.totalPages);
        setPetsData(data?.petsByUserLogin);
    };

    const createPetMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PetService.createPet(data);
            return result.data;
        },
        onSuccess: (data) => {
            toast.success("Tạo thành công");
            onClose();
            getPetsByUserLoginPagination();
            setPetName("");
            setBio("");
            setBreed("");
            setFilter("");
            setValueDate(null);
            setSelectedImage("");
            setSelectedSex("");
            setSelectedSpecies("");
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleCreatePet = async (values) => {
        let body;

        const originalDate = new Date(valueDate);
        const utcDate = new Date(originalDate.toUTCString());

        const birthday = utcDate;

        const imageRef = ref(ImageStorage, `pets/${userStore.id}/images/${Date.now()}`);
        if (selectedImage) {
            await uploadString(imageRef, selectedImage, "data_url").then(async (value) => {
                const downloadURL = await getDownloadURL(value.ref);
                body = {
                    name: values.petName,
                    species: values.species,
                    breed: values.breed,
                    bio: values.bio,
                    birthday: birthday,
                    avatar: downloadURL,
                    sex: values.sex,
                };
            });
        } else {
            toast.error("Vui lòng chọn ảnh dại diện cho thú cưng");
            return;
        }

        createPetMutation.mutate(body);
    };

    useEffect(() => {
        if (page !== undefined || filter !== undefined) {
            mutationPagination.mutate(page);
            mutationFilter.mutate(filter);
        }
    }, [page, filter]);

    const mutationPagination = useMutation({
        mutationFn: async (response) => {
            const body = { page: response, species: filter };
            const result = await PetService.getPetsByUserLoginPagination(body);
            return result.data;
        },
        onSuccess: async (data) => {
            setPetsData(data.petsByUserLogin);
            setTotalPages(data?.totalPages);
        },
    });

    const mutationFilter = useMutation({
        mutationFn: async (response) => {
            const body = { page: page, species: response };
            const result = await PetService.getPetsByUserLoginPagination(body);
            return result.data;
        },
        onSuccess: async (data) => {
            setPetsData(data.petsByUserLogin);
            setTotalPages(data.totalPages);
        },
    });

    const handlePagination = async (page) => {
        await setPage(page);
    };

    const handlePickTab = async (key) => {
        await setFilter(key);
        await setPage(1);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(PetSchema) });

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main>
                <div className="p-6 ">
                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="text-2xl font-semibold mb-1">Thú cưng</div>
                    </div>

                    {/* Modal Create Pet */}
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit(handleCreatePet)}>
                                        <ModalHeader className="flex flex-col gap-1">Thông tin thú cưng</ModalHeader>
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
                                                        type="button"
                                                        className="w-fit bg-violet-600 text-white text-[15px] font-medium rounded-xl p-2 px-4 mb-2 cursor-pointer"
                                                        onClick={handleUpdateButtonClick}
                                                    >
                                                        Cập nhật ảnh đại diện
                                                        <input
                                                            type="file"
                                                            id="petImage"
                                                            hidden
                                                            onChange={handleImageChange}
                                                            ref={fileInputRef}
                                                        />
                                                    </button>
                                                    {selectedImage && (
                                                        <button
                                                            type="button"
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
                                                        <label for="petName" className="font-medium flex items-center">
                                                            <p className="mr-4">Tên thú cưng</p>{" "}
                                                            <ErrorField sub={errors.petName?.message} />
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="petName"
                                                            // value={petName}
                                                            // onChange={(e) => setPetName(e.target.value)}
                                                            {...register("petName")}
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-3">
                                                        <label for="species" className="font-medium flex items-center">
                                                            <p className="mr-4">Loài</p>{" "}
                                                            <ErrorField sub={errors.species?.message} />
                                                        </label>
                                                        <Select
                                                            radius="sm"
                                                            size="md"
                                                            variant="bordered"
                                                            placeholder="Chọn loài"
                                                            labelPlacement="outside"
                                                            className="mt-1 bg-gray-50"
                                                            // value={selectedSpecies}
                                                            // onChange={(e) => setSelectedSpecies(e.target.value)}
                                                            {...register("species")}
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
                                                        <label for="breed" className="font-medium flex items-center">
                                                            <p className="mr-4">Giống</p>{" "}
                                                            <ErrorField sub={errors.breed?.message} />
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="breed"
                                                            // value={breed}
                                                            // onChange={(e) => setBreed(e.target.value)}
                                                            {...register("breed")}
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
                                                        <label for="sex" className="font-medium flex items-center">
                                                            <p className="mr-4">Giới tính</p>{" "}
                                                            <ErrorField sub={errors.sex?.message} />
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
                                                            // onChange={(e) => setSelectedSex(e.target.value)}
                                                            {...register("sex")}
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
                                                        <label for="bio" className="font-medium flex items-center">
                                                            <p className="mr-4">Giới thiệu</p>{" "}
                                                            <ErrorField sub={errors.bio?.message} />
                                                        </label>
                                                        <textarea
                                                            id="bio"
                                                            rows="3"
                                                            // value={bio}
                                                            // onChange={(e) => setBio(e.target.value)}
                                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                                                            placeholder="Mô tả về thú cưng của bạn."
                                                            {...register("bio")}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                <div className="text-[15px] font-medium">Đóng</div>
                                            </Button>
                                            <Button color="secondary" type="submit">
                                                <div className="text-[15px] font-medium">Xác nhận</div>
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* Controller */}
                    <div className=" overflow-y-hidden">
                        <div className="flex justify-between gap-x-4 w-full  h-full my-4">
                            <div className="flex flex-wrap gap-4">
                                <Tabs
                                    onSelectionChange={handlePickTab}
                                    key="filter"
                                    color="secondary"
                                    radius="full"
                                    size="lg"
                                >
                                    <Tab key="all" title="Tất cả" />
                                    <Tab key="dog" title="Chó" />
                                    <Tab key="cat" title="Mèo" />
                                    <Tab key="other" title="Khác" />
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
                                        <FindingBox variant="pet" keyword={filterKeyword} />
                                    </div>
                                </div>
                                <button
                                    className="flex items-center bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-xl"
                                    onClick={onOpen}
                                >
                                    <HiPlus className="mr-2" />
                                    Thêm thú cưng
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-3 pt-3 gap-6 p-6">
                            {mutationPagination.isPending ? (
                                <div className="flex items-center px-6 justify-center w-6 h-6">
                                    <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                                </div>
                            ) : (
                                petsData?.map((pet) => {
                                    const ageOfPet = calculateAge(pet.birthday);

                                    return (
                                        <PetProfileCard
                                            key={pet._id}
                                            petId={pet._id}
                                            petAvatar={pet.avatar}
                                            petName={pet.name}
                                            breed={pet.breed}
                                            sex={pet.sex === "male" ? "Đực" : "Cái"}
                                            age={ageOfPet}
                                            likes={pet.likes?.length}
                                            isUserOwner={pet.user === userStore.id}
                                            userLiked={pet.isLiked}
                                        />
                                    );
                                })
                            )}
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

export default withAuth(React.memo(pets));

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
