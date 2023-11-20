import React from "react";
import Link from "next/link";
import { useState } from "react";
import { CircularProgress } from "@nextui-org/react";

function ProfileCard( props ) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userAvatar, userName, gmail, pet, follower, following } = props;

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

  return (
    <div className=" bg-white cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl shadow border-1">
      <div className="flex flex-col items-center justify-center w-full m-auto">
        {/* Avatar */}
        <div className="py-5 flex mx-auto">
          <div className="flex items-center mt-4 justify-center">
            <img
              alt="profile"
              src={userAvatar}
              className="object-cover w-28 h-28 mx-auto rounded-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center flex-col w-full px-auto">
          <h2 className="flex text-md font-semibold text-gray-900">
            {userName}
          </h2>
          <p className="text-[15px] text-gray-500">{gmail}</p>
          <div className="flex items-center mt-4 justify-between space-x-10">
            <div className="flex flex-col">
              <div className="text-[15px]">Pet</div>
              <span className="text-md font-semibold flex flex-col text-center">
              {pet}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[15px]">Follower</div>
              <span className="text-md font-semibold flex flex-col text-center">
              {follower}{" "}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[15px]">Following</div>
              <span className="text-md font-semibold flex flex-col text-center">
              {following}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controller */}
      <div className="flex items-center space-x-5  justify-center w-full py-5">
        <Link href="">
          <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
            Xem Profile
          </button>
        </Link>

        <button
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
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
