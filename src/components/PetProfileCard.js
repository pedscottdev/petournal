import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import bgProfile from "../img/bg-profile.jpg";
import { CircularProgress } from "@nextui-org/react";
import { TbHeartFilled } from "react-icons/tb";
import defaultPetAvatar from "../img/default-pet-avatar.png";
import toast from "react-hot-toast";
import PetService from "../core/services/pet.service";
import { useMutation } from "@tanstack/react-query";
import { SocketContext } from "../core/socket/socket";
import NotificationService from "../core/services/notification.service";

function PetProfileCard(props) {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countLike, setCountLike] = useState();

    const { petAvatar, petName, species, sex, breed, likes, age, petId, userLiked, isUserOwner } = props;

    const socket = useContext(SocketContext);

    useEffect(() => {
        userLiked == true ? setIsLiked(true) : setIsLiked(false);
        setCountLike(likes);
    }, []);

    const isUserNotificationExist = async (body) => {
        const { data } = await NotificationService.isUserNotificationExist(body);
        return data;
    };

    const likePetMutation = useMutation({
        mutationFn: async (data) => {
            const result = await PetService.likePet(data);
            console.log(result);
            return result.data;
        },
        onSuccess: async (data) => {
            setCountLike(data.likes.length);
            setIsLiked(data.isLiked);
            data.isLiked == true ? toast.success("Đã thích") : toast.success("Đã huỷ thích");

            if (data.isLiked == true) {
                const body = { type: "LIKE_PET", pet_id: petId };
                if (await isUserNotificationExist(body)) return;
                if (isUserOwner) return;
                socket.emit("like-pet-notification", body);
            }
        },
    });

    const handleButtonClick = async () => {
        likePetMutation.mutate(petId);
    };

    return (
        <div className=" bg-white cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl shadow-sm border-1">
            <div className="flex flex-col items-center justify-center w-full m-auto">
                {/* Avatar */}
                <div className="py-5 mx-auto">
                    <div className="flex items-center w-full justify-center">
                        <img
                            alt="profile"
                            src={petAvatar ? petAvatar : defaultPetAvatar}
                            className="object-cover max-h-48 w-80 rounded-xl"
                        />
                    </div>
                </div>

                {/* <div className="relative flex h-32 w-full justify-center rounded-t-xl">
          <Image
            src={bgProfile}
            className="absolute object-cover opacity-30 flex h-32 w-full justify-center rounded-t-xl bg-cover"
            alt=""
            quality={100}
          />
          <div className="absolute -bottom-12 flex items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
            <img
              className="h-28 w-28 object-cover rounded-full"
              src={petAvatar}
              alt=""
            />
          </div>
        </div> */}

                {/* User Info */}
                <div className="flex  items-center flex-col w-full px-auto">
                    <div className="flex w-full px-6 justify-between">
                        <div className="flex flex-col w-full justify-start">
                            <h2 className="flex text-lg font-semibold text-gray-900">{petName}</h2>
                            <p className="text-[15px] text-gray-500">{breed}</p>
                        </div>
                        <button
                            className={`${
                                isLiked ? "bg-violet-500 text-white" : " text-violet-300 bg-violet-50"
                            } active:scale-[.94] active:duration-75 transition-all font-medium p-2 rounded-full md:text-base h-fit`}
                            onClick={handleButtonClick}
                        >
                            <TbHeartFilled className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex  mx-6 divide-x divide-gray-300 items-center mt-4 mb-2 justify-between">
                        <div className="flex flex-col px-5 justify-center">
                            <span className="text-md font-semibold flex flex-col text-center">{sex}</span>
                            <div className="text-sm font-medium text-gray-400">Giới tính</div>
                        </div>
                        <div className="flex flex-col px-5 justify-center text-center">
                            <span className="text-md font-semibold flex flex-col ">{age}</span>
                            <div className="text-sm font-medium text-gray-400">Tuổi</div>
                        </div>
                        <div className="flex flex-col px-5 backdrop:justify-center">
                            <span className="text-md font-semibold flex flex-col text-center">{countLike}</span>
                            <div className="text-sm font-medium text-gray-400">Lượt thích</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controller */}
            <div className="flex items-center space-x-5  justify-center w-full py-5">
                <Link href={`/pets/${petId}`}>
                    <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
                        Xem Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default PetProfileCard;
