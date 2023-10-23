"use client";
import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SidebarRow({Icon, title, active, onClick}) { 

  return (
    <div
      className={`flex hover:scale-[1.02] hover:duration-75 transition-all items-center justify-center xl:justify-start py-3 px-4 hover:bg-gray-100 text-gray-700 rounded-xl cursor-pointer ${active ? 'font-bold text-violet-600' : 'opacity-70'}`}
      onClick={onClick}
    >   
      {Icon && <Icon className="h-7 w-8"/>}
      <p className='hidden xl:inline-flex px-6 text-[17px]/[16px]'>{title}</p>   
    </div>
  )
}


export default SidebarRow; 