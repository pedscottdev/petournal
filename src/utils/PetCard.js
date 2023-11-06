import React from "react";
import Image from "next/image";
import PetAvatar from "../img/sammy-avatar.jpg";
import Link from "next/link";
import { Checkbox } from "@nextui-org/react";

function PetCard(props) {
  const { petName, petInfo, path, type } = props;

  return (
    <div className="pt-2 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={PetAvatar}
            className="w-9 h-9 rounded-full object-cover"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-md font-semibold text-gray-900 truncate dark:text-white">
            {petName}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {petInfo}
          </p>
        </div>
        {type === "tag" ? (
          <Checkbox color="secondary">
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
