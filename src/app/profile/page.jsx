"use client";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, button } from "@nextui-org/react";
import Link from "next/link";
import Head from "next/head";
import defaultAvatar from "/src/img/default-avatar.png";
import bgImg from "/src/img/bg-image.png";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import ProfileTabs from "../../components/ProfileTabs";
import InputBox from "../../components/InputBox";
import PostCard from "../../components/PostCard";
import ProfileCard from "../../components/ProfileCard";
import PetProfileCard from "../../components/PetProfileCard";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import {
    SearchIcon,
    InformationCircleIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { TbDog } from "react-icons/tb";
import PetsAvatar from "../../utils/PetsAvatar";
import UserService from "../../core/services/user.service";
import { useDispatch, useSelector } from "react-redux";
import TimeLineService from "../../core/services/time-line.service";
import PetService from "../../core/services/pet.service";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../components/share/loading";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ImageStorage } from "../../../firebase";
import { setAvatar } from "../../core/store/feature/user-slice";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoView, PhotoProvider } from "react-photo-view";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import withAuth from "../../middleware/withAuth";

function profile() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState();
    const [userBirthday, setUserBirthday] = useState();

    const [listPost, setListPost] = useState([]);
    const [listPet, setListPet] = useState([]);
    const [page, setPage] = useState(2);
    const [isPresent, setIsPresent] = useState("user");
    const [presentPet, setPresentPet] = useState(null);

    const userStore = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const filePickerRef = useRef(null);

    useEffect(() => {
        getProfileUser();
        getTimeLineByUserId();
        getPetsByUserId();
    }, []);

    const getProfileUser = async () => {
        const { data } = await UserService.getProfileUser(userStore.id);
        if (data) {
            setUserData(data);
            const birthday = new Date(data.user.birthday);
            const formattedDate = birthday.toLocaleDateString("en-GB");
            setUserBirthday(formattedDate);
        }
    };

    const getPetsByUserId = async () => {
        const { data } = await PetService.getPetsByUserId(userStore.id);
        setListPet(data);
    };

    const getTimeLineByUserId = async () => {
        const { data } = await TimeLineService.getTimeLineByUserId(userStore.id);
        setListPost(data);
    };

    const getPostsPet = async () => {
        const { data } = await PetService.getPostsPet(presentPet);
        setListPost(data);
    };

    const handleButtonClick = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isFollowing) {
            alert("Đã theo dõi");
        } else {
            alert("Đã hủy theo dõi");
        }

        setIsLoading(false);

        setIsFollowing((prevState) => !prevState);
    };

    const filterPetMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PetService.getPostsPet(data);
            return result.data;
        },
        onSuccess: (data) => {
            setListPost(data);
            resetPage();
            setIsPresent("pet");
        },
    });

    const handleFilterPet = (petId) => {
        filterPetMutation.mutate(petId);
        setPresentPet(petId);
    };

    const resetPage = async () => {
        await setPage(2);
    };

    const mutationUserPosts = useMutation({
        mutationFn: async (data) => {
            const body = { page: data };
            const result = await TimeLineService.getTimeLineByUserId(userStore.id, body);
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

    const mutationPetPosts = useMutation({
        mutationFn: async (data) => {
            const body = { page: data };
            const result = await PetService.getPostsPet(presentPet, body);
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
        if (
            scrollPosition > documentHeight - windowHeight * 1.1 &&
            !mutationUserPosts.isPending &&
            !mutationPetPosts.isPending
        ) {
            if (isPresent == "user") {
                mutationUserPosts.mutate(page);
            }
            if (isPresent == "pet") {
                mutationPetPosts.mutate(page);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const handlePickTab = (key) => {
        if (key == "pets") {
            setIsPresent("tabPets");
            setListPost(null);
            setPresentPet(null);
        }
        if (key == "feeds") {
            setIsPresent("user");
            getTimeLineByUserId();
            setPresentPet(null);
        }
        if (key == "followers") {
            setIsPresent("tabFollowers");
            setListPost(null);
            setPresentPet(null);
        }
        resetPage();
    };

    const addImageToUser = (e) => {
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
            const image = readerEvent.target.result;
            updateAvatar(image);
        };
    };

    const updateAvatarMutation = useMutation({
        mutationFn: async (data) => {
            const result = await UserService.updateUser(data);
            return result.data;
        },
        onSuccess: (data) => {
            toast.success("Đã cập nhật ảnh đại diện");
            dispatch(setAvatar(data.avatar));
            getTimeLineByUserId();
        },
    });

    const updateAvatar = async (image) => {
        const imageRef = ref(ImageStorage, `users/${userStore.id}/images/${Date.now()}`);
        await uploadString(imageRef, image, "data_url").then(async (value) => {
            const downloadURL = await getDownloadURL(value.ref);
            const body = { avatar: downloadURL };
            updateAvatarMutation.mutate(body);
        });
    };

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main>
                <div className="flex w-full flex-col flex-auto bg-gray-400 border-b border-gray-200">
                    <div className="w-full overflow-hidden bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1615715616181-6ba85d724137?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="w-full h-28 object-cover"
                        />
                        <div className="flex justify-center -mt-8 cursor-pointer">
                            <PhotoProvider
                                toolbarRender={({ onScale, scale }) => {
                                    return (
                                        <div className="flex text-2xl mx-10">
                                            <BsZoomIn className="cursor-pointer" onClick={() => onScale(scale + 1)} />
                                            <BsZoomOut
                                                className="mx-8 cursor-pointer"
                                                onClick={() => onScale(scale - 1)}
                                            />
                                        </div>
                                    );
                                }}
                            >
                                <PhotoView src={userStore.avatar}>
                                    <Image
                                        src={userStore.avatar}
                                        className="rounded-full object-cover border-solid w-24 h-24 border-white border-3 -mt-3"
                                        width={128}
                                        height={128}
                                        quality={100}
                                        alt="avatar"
                                    />
                                </PhotoView>
                            </PhotoProvider>
                        </div>
                        <div className="text-center px-3 pb-4 pt-2 rounded-t-xl">
                            <h3 className="text-gray-700 text-xl font-bold ">{userStore.fullName}</h3>
                            <p className=" text-[15px]">{userData?.user.bio}</p>
                            <p className="mt-2 text-sm text-gray-500">{userStore.email}</p>
                        </div>

                        {/* Controller */}
                        <div className="flex items-center justify-center ">
                            <div className="flex justify-center divide-x divide-gray-300py-2 pb-3">
                                <div className="flex flex-col text-center px-6">
                                    <div className="text-[15px]">Pet</div>
                                    <span className="text-md font-semibold flex flex-col text-center">
                                        {userData?.petsOfUser}
                                    </span>
                                </div>
                                <div className="flex flex-col text-center px-6 justify-center">
                                    <div className="text-[15px]">Follower</div>
                                    <span className="text-md font-semibold flex flex-col text-center">
                                        {userData?.followersOfUser}
                                    </span>
                                </div>
                                <div className="flex flex-col text-center px-6   justify-center">
                                    <div className="text-[15px]">Following</div>
                                    <span className="text-md font-semibold flex flex-col text-center">
                                        {userData?.followingsOfUser}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <div className="flex items-center space-x-5  justify-center w-full  px-4 py-5">
                                    <button
                                        onClick={() => filePickerRef.current.click()}
                                        className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full"
                                    >
                                        {updateAvatarMutation.isPending ? <Loading /> : "Thay đổi hình đại diện"}

                                        <input type="file" hidden onChange={addImageToUser} ref={filePickerRef} />
                                    </button>

                                    {/* <button
                                        className={`${
                                            isFollowing ? "bg-violet-50" : "bg-gray-100"
                                        } active:scale-[.94] active:duration-75 transition-all p-2 font-medium ${
                                            isFollowing ? "text-violet-600" : "text-gray-600"
                                        } text-[15px] px-4 rounded-full text-s md:text-base`}
                                        onClick={handleButtonClick}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center px-6 justify-center w-6 h-6">
                                                <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                                            </div>
                                        ) : isFollowing ? (
                                            "Theo dõi"
                                        ) : (
                                            "Đang theo dõi"
                                        )}
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col  ">
                    <Tabs
                        aria-label="Options"
                        color="secondary"
                        variant="underlined"
                        onSelectionChange={handlePickTab}
                        classNames={{
                            tabList:
                                "gap-6 w-full flex justify-center relative bg-white rounded-none p-0 border-b border-divider ",
                            cursor: "w-full bg-[#7C3AED]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "text-[16px] font-semibold group-data-[selected=true]:text-[#7C3AED] ",
                        }}
                    >
                        <Tab
                            key="feeds"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Nhật ký</span>
                                </div>
                            }
                        >
                            {/* Contents */}
                            <div className="flex space-y-4 px-6 justify-center ">
                                {/* Controller */}
                                <div className="flex flex-col min-w-[70%] max-w-[70%] gap-x-5 h-full my-4">
                                    <InputBox handleGetTimeLine={getTimeLineByUserId} handleResetPage={resetPage} />

                                    {/* Pets Filter */}
                                    <div className="flex gap-4 items-center justify-center mt-5">
                                        {listPet?.map((pet) => {
                                            return (
                                                <button key={pet._id} onClick={() => handleFilterPet(pet._id)}>
                                                    <PetsAvatar petAvatar={pet.avatar} />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {filterPetMutation.isPending ? (
                                        <div className="w-full flex justify-center my-16">
                                            <Loading />
                                        </div>
                                    ) : (
                                        listPost?.map((post) => {
                                            return (
                                                <PostCard
                                                    key={post._id}
                                                    postId={post._id}
                                                    // isUserFollowing={post?.isFollowing}
                                                    isUserLiked={post?.isLiked}
                                                    // socket={socket}
                                                    handleGetTimeLine={
                                                        isPresent == "user"
                                                            ? getTimeLineByUserId
                                                            : isPresent == "pet"
                                                            ? getPostsPet
                                                            : null
                                                    }
                                                    handleResetPage={resetPage}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </Tab>
                        <Tab
                            key="pets"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Thú cưng</span>
                                </div>
                            }
                        >
                            {/* Contents */}
                            <div className="space-y-4  ">
                                <div className="flex justify-end gap-x-5 w-full  h-full my-4">
                                    {/* Search */}
                                    <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-2 mx-3 w-[]">
                                        <SearchIcon className="h-4 ml-2 text-gray-500" />
                                        <input
                                            className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                                            type="text"
                                            placeholder="Tìm kiếm theo tên"
                                        ></input>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="grid grid-cols-3 pt-3 gap-6 p-4">
                                    {listPet?.map((pet) => {
                                        return (
                                            <PetProfileCard
                                                key={pet._id}
                                                petId={pet._id}
                                                petAvatar={pet.avatar}
                                                petName={pet.name}
                                                breed={pet.breed}
                                                sex={pet.sex}
                                                age={calculateAge(pet.birthday)}
                                                likes={pet.likes?.length}
                                                userLiked={pet.isLiked}
                                                isUserOwner={pet.user === userStore.id}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </Tab>
                        <Tab
                            key="followers"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Thông tin cơ bản</span>
                                </div>
                            }
                        >
                            {/* Contents */}
                            <div className="space-y-4 flex justify-center p-6">
                                <div className="flex-1 w-[70%] bg-white rounded-xl shadow-sm p-8">
                                    <h4 className="text-xl text-gray-900 font-bold">Thông tin cơ bản</h4>
                                    <ul className="mt-4 text-gray-700 text-[15px]">
                                        <li className="flex border-y py-2">
                                            <span className="font-bold w-32">Mô tả bản thân:</span>
                                            <span className="text-gray-700 ml-6">{userData?.user.bio}</span>
                                        </li>
                                        <li className="flex border-y py-2">
                                            <span className="font-bold w-32">Tên đầy đủ:</span>
                                            <span className="text-gray-700 ml-6">{userStore.fullName}</span>
                                        </li>
                                        <li className="flex border-b py-2">
                                            <span className="font-bold w-32">Ngày sinh:</span>
                                            <span className="text-gray-700 ml-6">{userBirthday}</span>
                                        </li>
                                        <li className="flex border-b py-2">
                                            <span className="font-bold w-32">Email:</span>
                                            <span className="text-gray-700 ml-6">{userData?.user.email}</span>
                                        </li>
                                        <li className="flex border-b py-2">
                                            <span className="font-bold w-32">Số điện thoại:</span>
                                            <span className="text-gray-700 ml-6">{userData?.user.phone}</span>
                                        </li>
                                        <li className="flex border-b py-2">
                                            <span className="font-bold w-32">Địa chỉ:</span>
                                            <span className="text-gray-700 ml-6">{userData?.user.address}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </main>
        </>
    );
}

export default withAuth(React.memo(profile));

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
