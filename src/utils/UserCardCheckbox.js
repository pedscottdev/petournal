import React from "react";
import { Checkbox, User, Chip, cn } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import FollowService from "../core/services/follow.service.js";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";

function UserCardCheckbox(props) {
    const { userId, userName, userEmail, userAvatar } = props;

    const [isSelected, setIsSelected] = React.useState(false);

    return (
        <Checkbox
            aria-label={userName}
            classNames={{
                base: cn(
                    "inline-flex w-full max-w-md bg-content1",
                    "hover:bg-content2 items-center justify-start",
                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
                label: "w-full",
            }}
            isSelected={isSelected}
            onValueChange={setIsSelected}
        >
            <div className="py-2 px-4 w-full ">
                <div className="flex items-center gap-x-3 ">
                    <div className="flex-shrink-0">
                        <Image
                            src={userAvatar}
                            className="w-10 h-10 rounded-full object-cover"
                            alt="Neil image"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/profile/${userId}`}
                            className="text-[15px] cursor-pointer font-semibold text-gray-900 truncate dark:text-white"
                        >
                            {userName}
                        </Link>
                        <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userEmail}</p>
                    </div>
                </div>
            </div>
        </Checkbox>
    );
}

export default UserCardCheckbox;
