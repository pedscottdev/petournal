"use client";
import React, { useState } from 'react';

function SidebarRow({Icon, title, active}) { 

  return (
    <div
      className={`flex hover:scale-[1.02] w-full hover:duration-75 transition-all items-center justify-center xl:justify-start py-3 px-4 hover:bg-gray-100 rounded-xl cursor-pointer ${active}`}
    >   
      {Icon && <Icon className="h-[1.69rem] w-[1.69rem]"/>}
      <p className={`hidden xl:inline-flex px-4 text-[17px] ${active}`}>{title}</p>   
    </div>
  )
}


export default SidebarRow; 