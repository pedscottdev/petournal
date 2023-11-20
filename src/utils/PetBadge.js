import React from 'react'
import Image from 'next/image'
import { TbX } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { setIsChecked } from '../core/store/feature/pet-slice';

function PetBadge(props) {

  const { petId, petAvatar, petName } = props;

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setIsChecked({id: petId, isChecked: false}))
  }

  return (
    <div className='flex items-center w-fit gap-2 p-1 pr-2 border-2 border-gray-200  rounded-full'>
        <div>
          <Image 
              className='flex w-6 h-6 sm:w-6 sm:h-6 rounded-full object-cover'
              width={100}
              height={100}
              src={petAvatar} 
              alt="Logo" 
          />
        </div>
        <div className='text-sm font-medium text-gray-500'>{petName}</div>
        <TbX onClick={handleCancel} className='cursor-pointer'/>
    </div>
  )
}

export default PetBadge