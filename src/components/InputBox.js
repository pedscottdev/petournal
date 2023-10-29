"use client";
import React, { useRef } from 'react'
import { useState } from 'react';
import Image from 'next/image';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
// import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import defaultAvatar from '/src/img/default-avatar.png';
import { 
  PhotographIcon,
  EmojiHappyIcon,
  XIcon,
 } from '@heroicons/react/outline';
  import { 
  TbDog,
 } from 'react-icons/tb'; 

function InputBox() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    //Ghi dữ liệu người dùng
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  };
 
  //Thêm vào emoji
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    
    <div className=' bg-white p-2 overfloy-y-none scrollbar-hide text-gray-500 rounded-xl shadow-sm'>
      <div className='flex space-x-5 p-4 pb-2'>
        <Image 
          className="rounded-full cursor-pointer w-11 h-11"
          src={defaultAvatar}
          // width={48}
          // height={48}
        />

        <div className='w-full'>
          <div className={``}>
            <input
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type='text'
              className='bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[42px]'
              placeholder='Hôm nay thú cưng của bạn thế nào?' 
            ></input>
          </div>
          <div>
          {selectedFile && (
            <div className='relative'>
              <div className='absolute w-8 h-8 bg-opacity-75 rounded-full flex items-center justify-center top-4 left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
                <XIcon className='h-5 w-5 p-1 ml-2 bg-white rounded-full text-gray-700'/>
              </div>
              <img 
                src={selectedFile}
                alt=''
                className='rounded-2xl my-4 justify-center max-h-80 object-contain '
              />
          </div>
          )}
        </div> 
        </div>
        {/* Hiển thị ảnh preview khi đăng ảnh */}
            
      </div>
      
      {/* Input Controller */}
      <div className="mb-3 mt-2 mx-4 border-b-2 border-gray-100"></div>
      <div className='flex gap-6 px-3  pb-1 items-center'>
        <button className='flex gap-2' onClick={() => filePickerRef.current.click()}>
          <PhotographIcon className='h-6 w-6 text-[#2683D7]'/>
          <p className='font-medium'>Thêm ảnh</p>
          <input 
            type='file'
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}
          />
        </button>
        
        <button className='flex gap-2 ml-2'>
          <TbDog className='h-6 w-6 text-violet-500'/>
          <p className='font-medium'>Thú cưng</p>
        </button>

        <button className='flex gap-2 ml-2' onClick={() => setShowEmojis(!showEmojis)}>
          <EmojiHappyIcon className='h-6 w-6 text-[#FE9A66]'/>
          <p className='font-medium'>Emoji</p>
        </button>

        {showEmojis && (
          // <Picker
          //   onSelect={addEmoji}
          //   style={{
          //     position: "absolute",
          //     marginTop: "465px",
          //     marginLeft: -40,
          //     maxWidth: "320px",
          //     borderRadius: "20px",
          //   }}
          //   theme="light"
          //   set="google"
          // />
          <Picker 
            data={data} 
            onEmojiSelect={addEmoji}
          />
        )}

        <div className='grow text-right'>
          <button className='bg-violet-600 text-[15px] font-medium text-white px-4 py-2 rounded-full hover:bg-violet-500 disabled:bg-violet-400 disabled:cursor-default' disabled={!input && !selectedFile} onClick={sendPost}>
            Chia sẻ
          </button>
        </div>
    
      </div>
    </div>
  )
}

export default InputBox;