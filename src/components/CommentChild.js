import React from "react";
import Image from "next/image";
import { MdSubdirectoryArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import defaultAvatar from "/src/img/default-avatar.png";

function CommentChild(props) {
  const { commentUserName, content, createdTime } = props;

  return (
    <div className="flex">
      <div className="flex mt-4">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-3 rounded-full w-7 h-7 sm:w-10 sm:h-10"
            src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt=""
          />
        </div>
        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <div className="flex items-center">
            <p className="font-semibold">{commentUserName}</p>
            <span className="ml-2 text-sm text-gray-400">{createdTime}</span>
          </div>
          <p className="text-[15px]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommentChild;
