"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import { useParams } from "next/navigation";
import { Tabs, Tab } from "@nextui-org/react";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    CircularProgress,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SearchIcon } from "@heroicons/react/outline";
import PetProfileCard from "../../../components/PetProfileCard";
import PostCard from "../../../components/PostCard";
import Loading from "../../../components/share/loading";
import PetsAvatar from "../../../utils/PetsAvatar";
import UserService from "../../../core/services/user.service";
import PetService from "../../../core/services/pet.service";
import TimeLineService from "../../../core/services/time-line.service";
import FollowService from "../../../core/services/follow.service";
import NotificationService from "../../../core/services/notification.service";
import ReportService from "../../../core/services/report.service";
import { SocketContext } from "../../../core/socket/socket";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoView, PhotoProvider } from "react-photo-view";
import withAuth from "../../../middleware/withAuth";

function profile() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isFollowing, setIsFollowing] = useState(false);

    const [userData, setUserData] = useState();
    const [userBirthday, setUserBirthday] = useState();
    const [page, setPage] = useState(2);

    const [listPost, setListPost] = useState([]);
    const [listPet, setListPet] = useState([]);

    const [isPresent, setIsPresent] = useState("user");
    const [presentPet, setPresentPet] = useState(null);
    const [selectedReason, setSelectedReason] = useState([]);

    const params = useParams();
    const userId = params.id;
    const socket = useContext(SocketContext);
    const userStore = useSelector((state) => state.user);

    useEffect(() => {
        getProfileUser();
        getTimeLineByUserId();
        getPetsByUserId();
    }, []);

    const getProfileUser = async () => {
        const { data } = await UserService.getProfileUser(userId);
        if (data) {
            if (data.isFollowing == true) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
            setUserData(data);
            const birthday = new Date(data.user.birthday);
            const formattedDate = birthday.toLocaleDateString("en-GB");
            setUserBirthday(formattedDate);
        }
    };

    const getPetsByUserId = async () => {
        const { data } = await PetService.getPetsByUserId(userId);
        setListPet(data);
    };

    const getTimeLineByUserId = async () => {
        const { data } = await TimeLineService.getTimeLineByUserId(userId);
        setListPost(data);
    };

    const getPostsPet = async () => {
        const { data } = await PetService.getPostsPet(presentPet);
        setListPost(data);
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

    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    const followMutaion = useMutation({
        mutationFn: async (data) => {
            const result = await FollowService.followUser(data);
            return result.data;
        },
        onSuccess: async () => {
            toast.success("Đã theo dõi");
            setIsFollowing(true);
            getProfileUser();

            const body = { type: "FOLLOW", follow_id: userId };

            if (await isUserNotificationExist(body)) return;

            socket.emit("follow-notification", body);
        },
    });

    const unFollowMutaion = useMutation({
        mutationFn: async (data) => {
            const result = await FollowService.unFollowUser(data);
            return result.data;
        },
        onSuccess: () => {
            toast.success("Đã huỷ theo dõi");
            setIsFollowing(false);
            getProfileUser();
        },
    });

    const handleButtonClick = async () => {
        if (isFollowing == true) {
            unFollowMutaion.mutate(userId);
        } else {
            followMutaion.mutate(userId);
        }
    };

    const mutationUserPosts = useMutation({
        mutationFn: async (data) => {
            const body = { page: data };
            const result = await TimeLineService.getTimeLineByUserId(userId, body);
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

    const reportUserMutation = useMutation({
        mutationFn: async (data) => {
            const body = { type: "USER", user: userId, reasons: data };
            const result = await ReportService.createReport(body);
            return result.data;
        },
        onSuccess: () => {
            toast.success("Đã báo cáo");
            onClose();
            setSelectedReason([]);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleReport = () => {
        console.log(selectedReason);
        reportUserMutation.mutate(selectedReason);
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
                                <PhotoView src={userData?.user.avatar ? userData?.user.avatar : defaultAvatar}>
                                    <Image
                                        src={userData?.user.avatar ? userData?.user.avatar : defaultAvatar}
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
                            <h3 className="text-gray-700 text-xl font-bold ">
                                {userData?.user.lastName + " " + userData?.user.firstName}
                            </h3>
                            <p className=" text-[15px]">{userData?.user.bio}</p>
                            <p className="mt-2 text-sm text-gray-500"></p>
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
                                        className={`${
                                            isFollowing ? "bg-violet-50" : "bg-gray-100"
                                        } active:scale-[.94] active:duration-75 transition-all p-2 font-medium ${
                                            isFollowing ? "text-violet-600" : "text-gray-600"
                                        } text-[15px] px-4 rounded-full text-s md:text-base`}
                                        onClick={handleButtonClick}
                                        disabled={followMutaion.isPending || unFollowMutaion.isPending}
                                    >
                                        {followMutaion.isPending || unFollowMutaion.isPending ? (
                                            <div className="flex items-center px-6 justify-center w-6 h-6">
                                                <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
                                            </div>
                                        ) : isFollowing ? (
                                            "Đang theo dõi"
                                        ) : (
                                            "Theo dõi"
                                        )}
                                    </button>
                                    <Button
                                        onPress={onOpen}
                                        className="bg-red-500 active:scale-[.94] active:duration-75 transition-all p-2 font-medium text-white text-[15px] px-4 rounded-full"
                                    >
                                        Báo cáo
                                    </Button>
                                    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
                                        <ModalContent>
                                            {(onClose) => (
                                                <>
                                                    <ModalHeader className="flex flex-col items-center justify-center text-xl gap-1">
                                                        Báo cáo
                                                    </ModalHeader>
                                                    <Divider />
                                                    <ModalBody>
                                                        <p className="text-gray-900 font-bold text-xl">
                                                            Hãy chọn vấn đề
                                                        </p>
                                                        <p className="text-gray-600 text-sm font-light">
                                                            Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà
                                                            hãy tìm ngay sự giúp đỡ trước khi báo cáo với Petournal.
                                                        </p>
                                                        <CheckboxGroup
                                                            color="secondary"
                                                            value={selectedReason}
                                                            onValueChange={setSelectedReason}
                                                            className="mt-4 w-[400px]"
                                                        >
                                                            <Checkbox
                                                                className="p-4 w-full rounded-md hover:bg-violet-100"
                                                                value="Giả mạo người khác"
                                                            >
                                                                <div className="flex items-center w-[350px] justify-between">
                                                                    <p className="pl-4">Giả mạo người khác</p>
                                                                    <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                                        <IoMdAdd />
                                                                    </div>
                                                                </div>
                                                            </Checkbox>
                                                            <Checkbox
                                                                className="p-4 rounded-md hover:bg-violet-100"
                                                                value="Quấy rối"
                                                            >
                                                                <div className="flex items-center w-[350px] justify-between">
                                                                    <p className="pl-4">Quấy rối</p>
                                                                    <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                                        <IoMdAdd />
                                                                    </div>
                                                                </div>
                                                            </Checkbox>
                                                            <Checkbox
                                                                className="p-4 rounded-md hover:bg-violet-100"
                                                                value="Gây chia rẽ"
                                                            >
                                                                <div className="flex items-center w-[350px] justify-between">
                                                                    <p className="pl-4">Gây chia rẽ</p>
                                                                    <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                                        <IoMdAdd />
                                                                    </div>
                                                                </div>
                                                            </Checkbox>
                                                            <Checkbox
                                                                className="p-4 rounded-md hover:bg-violet-100"
                                                                value="Bạo lực"
                                                            >
                                                                <div className="flex items-center w-[350px] justify-between">
                                                                    <p className="pl-4">Bạo lực</p>
                                                                    <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                                        <IoMdAdd />
                                                                    </div>
                                                                </div>
                                                            </Checkbox>
                                                            <Checkbox
                                                                className="p-4 rounded-md hover:bg-violet-100"
                                                                value="Nội dung không phù hợp"
                                                            >
                                                                <div className="flex items-center w-[350px] justify-between">
                                                                    <p className="pl-4">Nội dung không phù hợp</p>
                                                                    <div className="text-xl text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                                                                        <IoMdAdd />
                                                                    </div>
                                                                </div>
                                                            </Checkbox>
                                                        </CheckboxGroup>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" variant="light" onPress={onClose}>
                                                            Huỷ
                                                        </Button>
                                                        <Button color="secondary" onClick={handleReport}>
                                                            {reportUserMutation.isPending ? <Loading /> : "Gửi"}
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
                                                    isUserFollowing={post?.isFollowing}
                                                    isUserLiked={post?.isLiked}
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
                                                isUserOwner={pet.user === userStore.id}
                                                userLiked={pet.isLiked}
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
                                            <span className="text-gray-700 ml-6">
                                                {userData?.user.lastName + " " + userData?.user.firstName}
                                            </span>
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
