import React, { useState } from "react";
import Image from "next/image";
import { MdSubdirectoryArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import defaultAvatar from "/src/img/default-avatar.png";
import CommentChild from './CommentChild'
import { 
  PiCaretDownBold,
  PiCaretUpBold
 } from "react-icons/pi";

function CommentParent(props) {

  const { commentUserName, content, createdTime } = props;

  const [isCommentVisible, setCommentVisible] = useState(false);

  const toggleComment = () => {
    setCommentVisible(!isCommentVisible);
  };

  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-3">
        <img
          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
          alt=""
        />
      </div>

      <div className="flex-1 border-2 border-gray-100 rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed">
        <div className="flex items-center">
          <p className="font-semibold">{commentUserName}</p>
          <span className="ml-2 text-sm text-gray-400">{createdTime}</span>
        </div>

        <p className="text-[15px]">{content}</p>

        
        <div className="mt-2 flex space-x-6 items-center">
          <div className="flex mx-2 " onClick={toggleComment}>
            <PiCaretDownBold className={` h-5 w-5  ${isCommentVisible ? "hidden" : ""}`}/>
            <PiCaretUpBold className={` h-5 w-5  ${isCommentVisible ? "" : "hidden"}`} />
            <div className="text-sm ml-4 text-gray-500 font-semibold cursor-pointer">
              {`${
          isCommentVisible ? "Ẩn" : "Hiển thị"
        } phản hồi`} <span>(5)</span>
            </div>
          </div>
        </div>

        {/* Child Comment */}
        <div className={` ${
          isCommentVisible ? "" : "hidden"
        }`}>
          <CommentChild commentUserName="Sarah" createdTime="Just now" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."/>
        </div>
        

        {/* Input Reply Comment */}
        <div className="flex space-x-4 mt-4">
          <Image
            className="rounded-full cursor-pointer w-10 h-10"
            src={defaultAvatar}
            // width={48}
            // height={48}
          />

          <div className="w-full">
            <div className="flex items-center">
              <input
                type="text"
                className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[43px]"
                placeholder="Trả lời @Sarah"
              ></input>
              <button className="active:scale-[.90] active:duration-75 transition-all bg-violet-600 text-white text-lg rounded-full p-2.5 ml-2 ">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentParent;