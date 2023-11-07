import React from "react";
import Image from "next/image";
import { MdSubdirectoryArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import defaultAvatar from "/src/img/default-avatar.png";
import testAvatar from '/src/img/test-avatar.jpg';

function CommentChild(props) {
  const { commentUserName, content, createdTime } = props;

  return (
    <div className="flex">
      <div className="flex mt-4">
        <div className="flex-shrink-0 mr-3">
          <Image
            className="mt-3 rounded-full w-10 h-10"
            src={testAvatar}
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
          <div className="text-sm mt-2 text-gray-500 font-semibold cursor-pointer"> Xóa bình luận</div>
        </div>
        
      </div>
    </div>
  );
}

export default CommentChild;
