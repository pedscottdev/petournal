"use client";
import React, { useState } from 'react';

function SidebarRow({Icon, title, isActive, onClick}) { 

  return (
    <div
      className={`flex hover:scale-[1.02] hover:duration-75 transition-all items-center justify-center xl:justify-start py-3 px-4 hover:bg-gray-100 text-gray-700 rounded-xl cursor-pointer ${ isActive ? 'font-bold text-violet-600' : 'opacity-70'}`}
      onClick={onClick}
    >   
      {Icon && <Icon className="h-[1.65rem] w-[1.65rem]"/>}
      <p className='hidden xl:inline-flex font-medium px-5 text-base'>{title}</p>   
    </div>
  )
}


export default SidebarRow; 