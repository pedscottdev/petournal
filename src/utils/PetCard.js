import React, { useEffect, useState } from "react";
import Image from "next/image";
import PetAvatar from "../img/sammy-avatar.jpg";
import Link from "next/link";
import { Checkbox } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsChecked } from "../core/store/feature/pet-slice";

function PetCard(props) {
    const { petId, petAvatar, petName, isChecked, petInfo, path, type } = props;
    const dispatch = useDispatch();

    const handleCheckboxChange = () => {
        dispatch(setIsChecked({id: petId, isChecked: !isChecked}));
    };

    return (
        <div className="pt-2 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image
                        src={petAvatar ? petAvatar : PetAvatar}
                        className="w-9 h-9 rounded-full object-cover"
                        alt="Neil image"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-md font-semibold text-gray-900 truncate dark:text-white">{petName}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{petInfo}</p>
                </div>
                {type === "tag" ? (
                    <Checkbox color="secondary" isSelected={isChecked} onChange={handleCheckboxChange}>
                        Gắn thẻ
                    </Checkbox>
                ) : type === "list" ? (
                    <Link href={path}>
                        <div className="inline-flex items-center text-[15px] font-medium text-violet-600 cursor-pointer dark:text-white">
                            Xem nhật ký
                        </div>
                    </Link>
                ) : null}
            </div>
        </div>
    );
}

export default PetCard;
