import React from "react";
import Image from "next/image";
import logo from "/src/img/logo-icon.svg";
import logoName from "/src/img/logo-name.png";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

function Header() {
  return (
    <div className="flex sticky top-0 z-50 justify-between items-center p-[0.9rem] lg:px-5 bg-white  border-b-2 border-b-gray">
      {/* Logo Icon */}
      <a
        className="flex justify-center items-center cursor-pointer ml-8"
        href="/"
      >
        <Image
          className=""
          src={logo}
          alt="Logo"
          width={35}
          height={35}
          layout="fixed"
        />
        <Image
          className="ml-4 xl:flex hidden"
          src={logoName}
          alt="Petournal"
          width={100}
          height={100}
          layout="fixed"
        />
      </a>

      {/* Center */}
      <div className="hidden md:flex ml-2 items-center rounded-full bg-gray-100 py-1.5 px-3 ">
        <SearchIcon className="h-4 ml-2 text-gray-500" />
        <input
          className=" flex ml-4 bg-transparent outline-none text-gray-500 flex-shrink min-w-[20rem]"
          type="text"
          placeholder="Tìm kiếm trên Petournal"
        ></input>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Picture */}

        {/* Notification & Messages  */}
        <p className="whitespace-nowrap font-semibold pr-3 pl-3">Pedro Scott</p>
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}

export default Header;
