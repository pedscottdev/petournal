import React from "react";
import Image from "next/image";
import defaultAvatar from '/src/img/default-avatar.png';
import logoName from "/src/img/logo-name.png";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";


function Header() {
  return (
    <div className="flex sticky top-0 z-50 h-[65px] justify-between items-center p-4 lg:px-5 bg-white  border-b border-b-gray">
      {/* Logo Icon */}
      {/* <a
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
      </a> */}

      {/* Center */}
      <div className="hidden md:flex ml-2 items-center rounded-xl bg-[#f8f8f9] py-2 px-3 ">
        <SearchIcon className="h-4 ml-2 text-gray-500" />
        <input
          className=" flex ml-4 bg-transparent outline-none text-base text-gray-500 flex-shrink min-w-[20rem]"
          type="text"
          placeholder="Tìm kiếm trên Petournal"
        ></input>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Picture */}

        {/* Notification & Messages  */}    
        <BellIcon className="icon mr-3" />
        <div className="flex items-center cursor-pointer">
          <Image 
            className="rounded-full cursor-pointer w-8 h-8"
            src={defaultAvatar}
            // width={48}
            // height={48}
          />
          <p className="whitespace-nowrap font-medium pr-3 pl-3 text-base text-[#515366]">Pedro Scott</p>   
          <ChevronDownIcon className="" />
        </div>      
      </div>
    </div>
  );
}

export default Header;
