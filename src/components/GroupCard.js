import React from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Link from "next/link";

function GroupCard() {
  return (
    <div className="min-h[12rem] max-h[12rem] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-200 shadow rounded-2xl cursor-pointer">
      <div className="flex sm:flex">
        <div className="h-48 max-w-18 min-w-28 sm:mb-0 mb-3">
          <img
            src="https://images.unsplash.com/photo-1583339522870-0d9f28cef33f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="aji"
            className="max-w-18 min-w-18 h-full object-cover rounded-l-2xl"
          />
        </div>
        <div className="flex-auto sm:ml-3 justify-evenly p-4">
          <div className="flex items-center justify-between sm:mt-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="truncate flex-none text-lg text-gray-800 font-bold leading-none">
                  Hội những người yêu shiba
                </div>
                <div className="text-gray-400 text-[15px] mt-2">
                  15 thành viên
                </div>
                <div className="flex-auto  h-[40px] w-[350px] mt-2 my-1 truncate">
                  <span className="mr-3 ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sunt delectus, voluptatibus veniam necessitatibus unde
                    praesentium voluptatem. Laborum repellat rem velit.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <AvatarGroup size="sm" isBordered max={3}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />
              </AvatarGroup>
            </div>

            <Link href="/group/groupid">
              <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
                Truy cập nhóm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
