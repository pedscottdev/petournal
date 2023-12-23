import React from "react";
import "../app/globals.css";
import { IoIosArrowForward } from "react-icons/io";

function FindingCard(props) {
    const { userId, userAvatar, userName, email } = props;

    const handleClick = () => {
        console.log(userId);
    };

    return (
        <div className="px-6 py-5 cursor-pointer bg-white hover:bg-gray-100" onClick={handleClick}>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-shrink-0 w-[100%] h-full">
                    <img
                        src={userAvatar}
                        className="w-11 h-11 rounded-full object-cover flex items-center"
                        alt="User Avatar"
                    ></img>
                    <div className=" ml-4">
                        <a className="text-[15px] font-semibold cursor-pointer  text-gray-900 truncate dark:text-white">
                            {userName}
                        </a>

                        <div className="text-[15px] font-medium truncate limit-word text-gray-500">{email}</div>
                    </div>
                </div>
                <div className="w-[20%] h-full">
                    <div className="text-base text-right font-bold text-white bg-violet-600 rounded-full p-2 w-fit active:scale-[.94] active:duration-75 transition-all">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindingCard;
