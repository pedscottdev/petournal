import React from 'react'
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";

function PetsAvatar(props) {

  const { id, petAvatar } = props;

  return (
    <div className='cursor-pointer hover:scale-105'>
      <div className='hidden'>{id}</div>
      <Avatar isBordered src={petAvatar} />
    </div>
  )
}

export default PetsAvatar