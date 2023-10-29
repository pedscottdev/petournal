"use client";
import React, { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import CommentSection from "./CommentSection";
import defaultAvatar from "/src/img/default-avatar.png";
import testImage from "/src/img/test-image.jpg";
import testImage2 from "/src/img/test-image2.jpg";
import testImage3 from "/src/img/test-image3.jpg";
import {
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { TbDog } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";

function PostCard() {
  return (
    <div className="flex justify-center bg-white rounded-xl shadow-sm mt-6">
      <div className="flex flex-col p-6 w-full">
        {/* Header */}
        <div className="flex justify-between">
          <div className="text-[#6e767d] flex flex-row ">
            <Image
              src={defaultAvatar}
              alt="Avatar"
              className="h-11 w-11 rounded-full"
            />
            <div className=" group ml-4 mr-5 flex flex-col">
              <h3 className="font-semibold text-[15px] sm:text-base text-[#000000] hover:underline cursor-pointer">
                Pedro Scott
              </h3>
              <p className="text-gray-400 text-[14px]">15 phút trước</p>
            </div>
          </div>
          <HiDotsHorizontal className="flex justify-between cursor-pointer h-9 w-9 text-gray-500 icon" />
        </div>

        {/* Content */}
        <div className="mt-4">
          <p className="text-[#000000] text-[15px] sm:text-base">
            Sammy và Kitty vô cùng dễ thương.
          </p>
          <Image
            src={testImage}
            className="rounded-xl max-h-[360px] object-cover mt-4"
          />
        </div>

        {/* Metadata */}
        <div className="mt-4 border-b-2 border-gray-100"></div>
        <div className="flex items-center gap-10 ml-4 mt-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <HeartIcon className="cursor-pointer h-6 w-6 text-gray-700 hover:text-violet-500" />
            <p className="text-[15px]">
              <span className="">12</span> Like
            </p>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <ChatIcon className="cursor-pointer h-6 w-6 text-gray-700 hover:text-violet-500" />
            <p className="text-[15px]">
              <span>9</span> Comment
            </p>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <TbDog className="cursor-pointer h-6 w-6 text-gray-700 hover:text-violet-500" />
            <p className="text-[15px]">
              <span className="">2</span> Pet
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-4 border-b-2 border-gray-100"></div>
        <CommentSection />

        {/* Comment Input */}
        {/* Input */}
        <div className="flex space-x-4 mt-4">
          <Image
            className="rounded-full cursor-pointer w-11 h-11"
            src={defaultAvatar}
            // width={48}
            // height={48}
          />

          <div className="w-full">
            <div className='flex items-center'>
              <input
                type="text"
                className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[42px]"
                placeholder="Nhập bình luận"
              ></input>
              <button className="bg-violet-600 text-white text-lg rounded-full p-2 ml-2 ">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
