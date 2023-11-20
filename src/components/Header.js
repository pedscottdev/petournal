import React from "react";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "/src/img/default-avatar.png";
import logoName from "/src/img/logo-name.png";
import NotiCard from '../utils/NotiCard'
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  Badge,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

function Header() {
  return (
    <div className="flex flex-shrink-0 sticky top-0 z-50 max-h-[65px] justify-between items-center p-4 lg:px-5 bg-white  border-b border-b-gray">
      {/* Search */}
      <div className="hidden md:flex ml-2 items-center rounded-xl bg-[#f8f8f9] py-2 px-3 ">
        <SearchIcon className="h-5 ml-2 text-gray-500" />
        <input
          className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
          type="text"
          placeholder="Tìm kiếm trên Petournal"
        ></input>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-4 justify-end">
        {/* Notification & Messages  */}

        <Popover placement="bottom" showArrow={true}>
          <Badge
            className=" text-xs bg-[#E13232] text-white border-white mr-1"
            content="1"
            shape="circle"
            variant="flat"
            disableOutline="true"
          >
            <PopoverTrigger>
              <Button
                radius="full"
                isIconOnly
                variant="light"
                className="border-2 border-gray-100"
              >
                <BellIcon className="w-6 h-6 text-gray-600" />
              </Button>
            </PopoverTrigger>
          </Badge>
          <PopoverContent className="p-0">
            <div className="flex text-lg font-semibold py-3 pl-5 justify-start">Thông báo</div>
            <div className="divide-y divide-gray-100">
              < NotiCard type="like"/>
              < NotiCard type="comment"/>
              < NotiCard type="follow"/>
              < NotiCard type=""/>
            </div>
            <div className="flex justify-center text-base font-semibold text-violet-600 py-3 cursor-pointer w-full">Xem thêm</div>       
          </PopoverContent>
        </Popover>

        <Dropdown
          showArrow
          radius="sm"
          classNames={{
            base: "p-0 border-divider bg-background",
            arrow: "bg-default-200",
          }}
        >
          <DropdownTrigger>
            <div className="flex flex-row items-center cursor-pointer space-x-4">
              <Image
                className="rounded-full cursor-pointer w-9 h-9"
                src={defaultAvatar}
                alt=""
                width={64}
                height={64}
                quality={100}
              />
              <p className="text-[14px] font-medium flex flex-col">
                Pedro Scott{" "}
                <span className="text-xs font-light text-gray-500">
                  pedscottdev@gmail.com
                </span>
              </p>
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            className="p-3"
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection aria-label="Profile & Actions" showDivider>
              <DropdownItem key="profile">
                <Link href="/profile" className="text-[15px]">
                  Trang cá nhân
                </Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href="/settings" className="text-[15px]">
                  Cài đặt
                </Link>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="logout" className="">
                <p>Đăng xuất</p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
