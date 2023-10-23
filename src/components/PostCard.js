"use client";
import React, { useRef } from 'react'
import { useState } from 'react';
import Image from 'next/image';
import defaultAvatar from '/src/img/default-avatar.png';
import testImage from '/src/img/test-image.jpg';
import testImage2 from '/src/img/test-image2.jpg';
import testImage3 from '/src/img/test-image3.jpg';
import { 
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
 } from '@heroicons/react/outline';
  import { 
  TbDog,
 } from 'react-icons/tb'; 

//  useEffect(
//   () =>
//     onSnapshot(
//       query(
//         collection(db, "posts", id, "comments"),
//         orderBy("timestamp", "desc")
//       ),
//       (snapshot) => setComments(snapshot.docs)
//     ),
//   [db, id]
// );

// useEffect(
//   () =>
//     onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
//       setLikes(snapshot.docs)
//     ),
//   [db, id]
// );

// useEffect(
//   () =>
//     setLiked(
//       likes.findIndex((like) => like.id === session?.user?.uid) !== -1
//     ),
//   [likes]
// );

// const likePost = async () => {
//   if (liked) {
//     await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
//   } else {
//     await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
//       username: session.user.name,
//     });
//   }
// };

function PostCard() {
  return (
    <div className='border-b border-gray-300'>
      <div className='flex flex-col space-y-2 space-x-5 p-6 w-full border-b border-gray-300'>
        <div className='flex'>
          <Image
              src={defaultAvatar}
              // src={post?.userImg}
              alt="Avatar"
              className="h-11 w-11 rounded-full"
          />  
          <div className='text-[#6e767d]'>
            <div className='inline-block group ml-6 mr-5'>
              <h3 className={`font-bold text-[15px] sm:text-base text-[#000000] inline-block hover:underline`}>Pedro Scott</h3>
              <span className={`text-sm sm:text-[15px] ml-2`}>
                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                · 15 phút trước
              </span>
              <p className={`text-[#000000] text-[15px] sm:text-base mt-0.5`}>Sammy và Kitty vô cùng dễ thương.</p>
              <Image
                // src={post?.image}
                src={testImage}
                className='rounded-2xl max-h-[700px] object-cover mt-4'
              />
            </div>
           
            <div
              className="flex items-center gap-10 ml-6 mt-4"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   likePost();
              // }}
            >
              <div className="flex gap-2">
                <span className=''>12</span>
                <HeartIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex gap-2">
                <span className=''>22</span>
                <ChatIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
              
              <div className="flex gap-2">
                <span className=''>2</span>
                <TbDog className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex ml-3">
                <TrashIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
            </div>      
          </div>
        </div>

      </div>

      {/* Post2 */}
      <div className='flex flex-col space-y-2 space-x-5 p-5 w-full border-b border-gray-300'>
        <div className='flex'>
          <Image
              src={defaultAvatar}
              // src={post?.userImg}
              alt="Avatar"
              className="h-11 w-11 rounded-full"
          />  
          <div className='text-[#6e767d]'>
            <div className='inline-block group ml-6 mr-5'>
              <h3 className={`font-bold text-[15px] sm:text-base text-[#000000] inline-block hover:underline`}>Pedro Scott</h3>
              <span className={`text-sm sm:text-[15px] ml-2`}>
                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                · 38 phút trước
              </span>
              <p className={`text-[#000000] text-[15px] sm:text-base mt-0.5`}>Mèo và chó quả là những người bạn thật tuyệt vời.</p>
              <Image
                // src={post?.image}
                src={testImage2}
                className='rounded-2xl max-h-[700px] object-cover mt-4'
              />
            </div>
           
            <div
              className="flex items-center gap-10 ml-6 mt-4"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   likePost();
              // }}
            >
              <div className="flex gap-2">
                <span className=''>12</span>
                <HeartIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex gap-2">
                <span className=''>22</span>
                <ChatIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
              
              <div className="flex gap-2">
                <span className=''>2</span>
                <TbDog className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex ml-3">
                <TrashIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
            </div>      
          </div>
        </div>
      </div>

      {/* Post3 */}
      <div className='flex flex-col space-y-2 space-x-5 p-5 w-full border-b border-gray-300'>
        <div className='flex'>
          <Image
              src={defaultAvatar}
              // src={post?.userImg}
              alt="Avatar"
              className="h-11 w-11 rounded-full"
          />  
          <div className='text-[#6e767d]'>
            <div className='inline-block group ml-6 mr-5'>
              <h3 className={`font-bold text-[15px] sm:text-base text-[#000000] inline-block hover:underline`}>Pedro Scott</h3>
              <span className={`text-sm sm:text-[15px] ml-2`}>
                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                · 1 giờ trước
              </span>
              <p className={`text-[#000000] text-[15px] sm:text-base mt-0.5`}>Hai cu cậu nhà mình buổi sáng thứ bảy đây!</p>
              <Image
                // src={post?.image}
                src={testImage3}
                className='rounded-2xl max-h-[700px] object-cover mt-4'
              />
            </div>
           
            <div
              className="flex items-center gap-10 ml-6 mt-4"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   likePost();
              // }}
            >
              <div className="flex gap-2">
                <span className=''>12</span>
                <HeartIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex gap-2">
                <span className=''>22</span>
                <ChatIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
              
              <div className="flex gap-2">
                <span className=''>2</span>
                <TbDog className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>

              <div className="flex ml-3">
                <TrashIcon className="h-6 w-6 text-gray-700 hover:text-violet-500" />
              </div>
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard