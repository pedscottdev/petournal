import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import bgProfile from "../img/bg-profile.jpg";
import { CircularProgress } from "@nextui-org/react";
import { TbHeartFilled } from "react-icons/tb";

function PetProfileCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { petAvatar, petName, species, sex, breed, likes, age } = props;

  const handleButtonClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isLiked) {
      alert("Đã yêu thích");
    } else {
      alert("Đã hủy yêu thích");
    }

    setIsLiked((prevState) => !prevState);
  };

  return (
    <div className=" bg-white cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl shadow-sm border-1">
      <div className="flex flex-col items-center justify-center w-full m-auto">
        {/* Avatar */}
        <div className="py-5 mx-auto">
          <div className="flex items-center w-full justify-center">
            <img
              alt="profile"
              src={petAvatar}
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
              <h2 className="flex text-lg font-semibold text-gray-900">
                {petName}
              </h2>
              <p className="text-[15px] text-gray-500">{breed}</p>
            </div>
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

          <div className="flex  mx-6 divide-x divide-gray-300 items-center mt-4 mb-2 justify-between">
            <div className="flex flex-col px-5 justify-center">
              <span className="text-md font-semibold flex flex-col text-center">
                {sex}
              </span>
              <div className="text-sm font-medium text-gray-400">Giới tính</div>
            </div>
            <div className="flex flex-col px-5 justify-center text-center">
              <span className="text-md font-semibold flex flex-col ">
                {age}
              </span>
              <div className="text-sm font-medium text-gray-400">Tuổi</div>
            </div>
            <div className="flex flex-col px-5 backdrop:justify-center">
              <span className="text-md font-semibold flex flex-col text-center">
                {likes}
              </span>
              <div className="text-sm font-medium text-gray-400">
                Lượt thích
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controller */}
      <div className="flex items-center space-x-5  justify-center w-full py-5">
        <Link href="pets/profile">
          <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
            Xem Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PetProfileCard;
