import React from "react";
import defaultAvatar from "../img/default-avatar.png";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiArrowCircleRight } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import ChatLine from "../utils/ChatLine";
import Divider from "../utils/Divider";

function Chatbox(props) {

  const { userAvatar, userName } = props;

  return (
    <div className="bg-[#FBFBFB] h-full">
      {/* Header */}
      <div className="flex items-center p-6 h-[10%] py-4 border-b border-gray-200 justify-between">
        <div className="flex items-center gap-x-4">
          <img
            src={userAvatar}
            className="w-10 h-10 rounded-full object-cover"
          ></img>
          <p className="font-medium text-lg">{userName}</p>
        </div>
        <div className="flex gap-x-2">
          <button className="w-11 h-11 p-1 hover:bg-gray-100 rounded-full flex justify-center items-center text-gray-500 active:scale-[.94] active:duration-75 transition-all">
            <HiOutlineUserCircle className="text-3xl" />
          </button>
          <button className="w-11 h-11 p-1 hover:bg-gray-100 rounded-full flex justify-center items-center text-gray-500 active:scale-[.94] active:duration-75 transition-all">
            <MdMoreVert className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Threads */}
      <div className="flex overflow-y-auto flex-col-reverse h-[80%] ">
        <div className="bg-white space-y-2 border-b pb-6 border-gray-200">
          <Divider label="28 Tháng 10" />
          <ChatLine
            userAvatar="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
            content="Hi!"
            time="13:00PM"
            type="receiver"
          />
          <ChatLine
            userAvatar="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            content="Hey, dude!"
            time="13:00PM"
            type="sender"
          />
          <ChatLine
            userAvatar="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            content="Long time no see."
            time="13:00PM"
            type="sender"
          />
          <ChatLine
            userAvatar="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
            content="Yeah, man... Things were quite busy for me and my family."
            time="13:00PM"
            type="receiver"
          />
          <ChatLine
            userAvatar="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            content="What's up? Anything I can help with?"
            time="13:00PM"
            type="sender"
          />
          <ChatLine
            userAvatar="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
            content="We've been on the move, changed 3 places over 4 months"
            time="13:00PM"
            type="receiver"
          />
          <ChatLine
            userAvatar="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            content="Wow! That's crazy! 🤯 What happened?"
            time="13:00PM"
            type="sender"
          />
          <ChatLine
            userAvatar="https://yt3.googleusercontent.com/Q3ZVnrNcfMVJZoqBazxIe7SUFyd-sHLy-1e50HixqGY_DGvkJ9_x0pgPFqyXWjTUKZnWW73_OoY=s900-c-k-c0x00ffffff-no-rj"
            content="You know I got a job in that big software company. First move was because of that."
            time="13:00PM"
            type="receiver"
          />
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center space-x-4 w-full px-6 h-[10%] bg-[#fbfbfb]">
        <div className="w-full flex items-center border-2 border-gray-300 rounded-full bg-[#f8f8f9] py-2.5 px-3 ">
          <input
            className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink"
            type="text"
            placeholder="Nhập tin nhắn"
          ></input>
        </div>
        <button className="active:scale-[.94] active:duration-75 transition-all">
          <HiArrowCircleRight className="w-11 h-11 text-violet-600"/>
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
