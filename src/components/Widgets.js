import React from "react";
import defaultAvatar from "/src/img/default-avatar.png";
import testAvatar from "/src/img/test-avatar.jpg";
import testAvatar2 from "/src/img/test-avatar2.jpg";
import Image from "next/image";
import UserCard from "../utils/UserCard";
import { BellIcon, SearchIcon } from "@heroicons/react/outline";

function Widgets() {
  return (
    <div className="py-6 flex-shrink-0 space-y-8 w-full">
      <div className="rounded-xl bg-white shadow-sm">

        <h4 className="font-semibold text-lg px-4 py-3 border-b-2 border-gray-100">Có thể bạn biết</h4>

        {/* Users */}
        <div className="space-y-1 py-2">
          <UserCard
            userName="Phuoc Nguyen"
            userAvatar={defaultAvatar}
            follower="47"
          />
          <UserCard
            userName="Thai Son Nguyen"
            userAvatar={testAvatar}
            follower="140"
          />
          <UserCard
            userName="Huong Lua Nguyen"
            userAvatar={testAvatar2}
            follower="1K"
          />
        </div>

        <button className="py-3 px-2 rounded-b-xl hover:bg-violet-50 cursor-pointerflex items-center justify-center w-full text-violet-600 font-semibold ">
          Xem thêm
        </button>
      </div>
    </div>
  );
}

export default Widgets;
