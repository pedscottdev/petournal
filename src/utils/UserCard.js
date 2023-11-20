import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiCheckBold, PiXBold } from "react-icons/pi";

function UserCard(props) {
  const { userAvatar, userName, follower, link } = props;

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    if (isFollowing) {
      alert("Đã bỏ theo dõi");
      setIsFollowing(false);
    } else {
      alert("Đã theo dõi");
      setIsFollowing(true);
    }
  };

  return (
    <div className="py-2 px-4 w-full ">
      <div className="flex items-center gap-x-3 ">
        <div className="flex-shrink-0">
          <Image
            src={userAvatar}
            className="w-10 h-10 rounded-full object-cover"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <a className="text-[15px] cursor-pointer font-semibold text-gray-900 truncate dark:text-white">
            {userName}
          </a>
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
            {follower} người theo dõi
          </p>
        </div>
        <div>
          {isFollowing ? (
            <div className="flex items-center space-x-2">
              <PiCheckBold
                className=" cursor-pointer rounded-full w-7 h-7 p-1 text-violet-600 bg-violet-100"
              />
              <PiXBold
                onClick={handleFollowClick}
                className=" cursor-pointer rounded-full w-7 h-7 p-1 text-violet-600 "
              />
            </div>
          ) : (
            <div className=" inline-flex items-center text-[15px] mr-2 font-semibold text-violet-600 cursor-pointer dark:text-white" onClick={handleFollowClick}>
              Theo dõi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
