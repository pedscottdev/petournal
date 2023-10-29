"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SidebarRow from './SidebarRow'
import Image from 'next/image'
import SmLogo from '/src/img/sm-logo.svg'
import LgLogo from '/src/img/lg-logo.svg'
import logoName from '/src/img/logo-name.png'
import { 
  BiNews,
 } from 'react-icons/bi';
 import { 
  TbPaw,
  TbHome2,
 } from 'react-icons/tb';
 import { 
  HiHome,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
 } from 'react-icons/hi';
 import { 
  RiHandHeartLine,
 } from 'react-icons/ri';
import { 
  LogoutIcon,
  StarIcon, 
  CogIcon,
  AnnotationIcon,
 } from '@heroicons/react/outline'; 
 import {
  UserCircleIcon, 
  ChevronDownIcon,
 } from '@heroicons/react/solid';
 import { 
  PiDogBold,
  PiHouseSimpleBold,
 } from "react-icons/pi";
 

function Sidebar() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const menuItems = [
    {
      path: "/",
      title: "Trang chủ",
      icon: BiNews,
    },
    {
      path: "/pets",
      title: "Thú cưng",
      icon: PiDogBold,
    },
    {
      path: "/follower",
      title: "Người theo dõi",
      icon: StarIcon,
    },
    {
      path: "/group",
      title: "Nhóm",
      icon: HiOutlineUserGroup,
    },
    {
      path: "/chat",
      title: "Tin nhắn",
      icon: AnnotationIcon,
    },
    {
      path: "/petcare",
      title: "Pet Care",
      icon: RiHandHeartLine,
    },
    {
      path: "/profile",
      title: "Trang cá nhân",
      icon: HiOutlineUserCircle,
    },

  ];
  
  const handleMenuItemClick = (path) => {
    setActiveMenuItem(path);
  };

  return (
    <div className='hidden flex-shrink-0 sm:flex lg:flex md:flex w-[300px] xl:flex xl:flex-col bg-white h-screen xl:w-[275px] sm:w-[80px] fixed border-r border-gray-200'>    
      <div className='w-full'>

        {/* Logo */}
          <a className='flex justify-center items-center h-[65px] p-4 border-b border-gray cursor-pointer' href='/'>
            <Image 
              className='flex lg:hidden xl:hidden'
              src={SmLogo} 
              alt="Logo" 
              width={35} 
              height={35} 
              layout='fixed' 
            />
            <Image 
              className='xl:flex lg:flex md:hidden sm:hidden '
              src={LgLogo} 
              alt="Petournal" 
              width={160} 
              height={100} 
              layout='fixed' 
            />   
          </a>

        {/* Menubar */}
        <div className="mt-4 sm:px-2 md:px-2 xl:px-4 lg:space-y-36 xl:space-y-36">
          <div>
            {menuItems.map((item, index) => (
              <Link href={item.path} >
                <SidebarRow
                  Icon={item.icon}
                  title={item.title}
                  isActive={activeMenuItem === item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                />
              </Link>
            ))}
          </div>
          
          <div>
            <div className="mt-4 mx-4 border-b-2"></div>
            <div className='mt-4'>
              
              <Link href="/settings">
                  <SidebarRow Icon={CogIcon} title="Cài đặt" />  
              </Link>
              <Link href="/login">
                  <SidebarRow Icon={LogoutIcon} title="Đăng xuất"/> 
              </Link>
                        
            </div>
          </div>
          
        </div>
      </div>   
    </div>
  )
}

export default React.memo(Sidebar);
