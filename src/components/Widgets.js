import React from 'react'
import defaultAvatar from '/src/img/default-avatar.png';
import testAvatar from '/src/img/test-avatar.jpg';
import testAvatar2 from '/src/img/test-avatar2.jpg';
import Image from 'next/image';
import { 
  BellIcon,
  SearchIcon, 
 } from '@heroicons/react/outline'; 

function Widgets() {
  return (
    <div className='py-6 flex-shrink-0 space-y-8' >    
      {/* Thông báo và tìm kiếm */}
      {/* <div className='flex p-2 px-4 space-x-4 bg-white'>
        <BellIcon className='icon'/>
        <div className='hidden md:flex px-2 items-center rounded-full bg-gray-100 py-1.5'>
          <SearchIcon className='h-5 pl-2 text-gray-500'/>
          <input className=' flex ml-4 bg-transparent outline-none text-gray-500 flex-shrink pr-14'
          type="text"  placeholder="Tìm kiếm trên Petournal"></input>
        </div>    
      </div>   */}

      <div className="p-2 rounded-xl bg-white shadow-sm">
        
        <h4 className="font-bold text-xl px-4 py-2">Có thể bạn biết</h4>
       
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <Image
              src={defaultAvatar}
              objectFit="cover"
              className="rounded-full w-11 h-11"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-semibold group-hover:underline">
                Phuoc Nguyen
              </h4>
              <h5 className="text-gray-500 text-[14px]">47 người theo dõi</h5>
            </div>
            <button className="ml-auto text-violet-500 rounded-full font-bold text-sm py-1.5 px-3.5">
              Theo dõi
            </button>
          </div>
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <Image
              src={testAvatar}
              objectFit="cover"
              className="rounded-full w-11 h-11"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-semibold group-hover:underline">
                Son Nguyen
              </h4>
              <h5 className="text-gray-500 text-[14px]">89 người theo dõi</h5>
            </div>
            <button className="ml-auto text-violet-500 rounded-full font-bold text-sm py-1.5 px-3.5">
              Theo dõi
            </button>
          </div>

          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <Image
              src={testAvatar2}
              objectFit="cover"
              className="rounded-full w-11 h-11"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-semibold group-hover:underline">
                Huong Lua Nguyen
              </h4>
              <h5 className="text-gray-500 text-[14px]">123 người theo dõi</h5>
            </div>
            <button className="ml-auto text-violet-500 rounded-full font-bold text-sm py-1.5 px-3.5">
              Theo dõi
            </button>
          </div>
        <button className=" px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-violet-500 font-base">
          Xem thêm
        </button>
      </div>  
    </div>
  )
}

export default Widgets