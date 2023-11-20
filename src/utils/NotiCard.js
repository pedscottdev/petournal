import React from 'react'
import Image from 'next/image';
import defaultAvatar from "/src/img/default-avatar.png";
import { TbX } from "react-icons/tb";

function NotiCard(props) {

  const { userAvatar, userName, time, type  } = props;

  return (
    <>
      {type === "follow" ? (
        <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm">
          <div className="flex-shrink-0">
            <Image className="rounded-full w-11 h-11 mr-6" alt="" src={defaultAvatar}/>
          </div>
          <div className="w-full ml-4">
              <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 ">
                Joseph Mcfall</span> và những người khác đã bắt đầu theo dõi bạn.
              </div>
              <div className="text-sm text-gray-500 ">10 phút trước</div>
          </div>
        </div>
      ) : type === "like" ? (
        <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm">
          <div className="flex-shrink-0">
            <Image className="rounded-full w-11 h-11 mr-6" alt="" src={defaultAvatar}/>
          </div>
          <div className="w-full ml-4">
              <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 ">
                Joseph Mcfall</span> và những người khác đã thích bài viết của bạn.
              </div>
              <div className="text-sm text-gray-500 ">10 phút trước</div>
          </div>
        </div>
      ) : type == "comment" ?(
        <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm">
          <div className="flex-shrink-0">
            <Image className="rounded-full w-11 h-11 mr-6" alt="" src={defaultAvatar}/>
          </div>
          <div className="w-full ml-4">
              <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 ">
                Joseph Mcfall</span> và những người khác đã bình luận về bài viết của bạn.
              </div>
              <div className="text-sm text-gray-500 ">10 phút trước</div>
          </div>
        </div>
      ) : type == "" ? (
        <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer  w-full max-w-sm">
          <div className="flex-shrink-0">
            <Image className="rounded-full w-11 h-11 mr-6" alt="" src={defaultAvatar}/>
          </div>
          <div className="w-full ml-4">
              <div className="text-gray-600 text-[15px] mb-1.5 dark:text-gray-400">
                Chưa có thông báo nào
              </div>
          </div>
        </div>
      ) : null}
    </>  
  )
}

export default NotiCard