"use client";
import React from 'react'
import Link from 'next/link'
import { ClipboardListIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/outline';
import { 
  TbDog,
 } from 'react-icons/tb';

function ProfileTabs(active) {
  const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
  const activeTabClasses = 'flex gap-1 px-4 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold';

  return (
    <div className="flex pt-4  md:mt-6 gap-12 border-t border-gray-300 w-full justify-center">
      <div className='flex flex-row gap-1 cursor-pointer'>
        {/* <Link href={`/profile/[userId]/about`} className={active === 'posts' ? activeTabClasses : tabClasses}> */}
          <ClipboardListIcon className='h-5 text-gray-500'/>
          <span className="hidden text-sm font-medium text-gray-500 sm:block">NHẬT KÝ</span>
        {/* </Link> */}
      </div>
      
      <div className='flex flex-row gap-1 cursor-pointer'>
        {/* <Link className={active === 'about' ? activeTabClasses : tabClasses}> */}
          <StarIcon className='h-5 text-gray-500'/>
          <span className="hidden text-sm font-medium text-gray-500 sm:block">THÚ CƯNG</span>
        {/* </Link>   */}
      </div>
      
      <div className='flex flex-row gap-1 cursor-pointer'>
        {/* <Link className={active === 'friends'? activeTabClasses : tabClasses}> */}
          <InformationCircleIcon className='h-5 text-gray-500'/>
          <span className="hidden text-sm font-medium text-gray-500 sm:block">THÔNG TIN</span>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default ProfileTabs
