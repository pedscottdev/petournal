import React from 'react'
import Image from 'next/image'
import { TbX } from "react-icons/tb";

function PetBadge(props) {

  const { petAvatar, petName } = props;

  return (
    <div className='flex items-center w-fit gap-2 p-1 pr-2 border-2 border-gray-200  rounded-full'>
        <div>
          <Image 
              className='flex w-6 h-6 sm:w-6 sm:h-6 rounded-full object-cover'
              // width={28}
              // height={28}
              src={petAvatar} 
              alt="Logo" 
          />
        </div>
        <div className='text-sm font-medium text-violet-600'>{petName}</div>
        <TbX className='cursor-pointer'/>
    </div>
  )
}

export default PetBadge