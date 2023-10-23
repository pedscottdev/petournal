"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SidebarRow from './SidebarRow'
import Image from 'next/image'
import logo from '/src/img/logo-icon.svg'
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

function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const router = useRouter();

  const menuItems = [
    {
      path: "/",
      title: "Trang chủ",
      icon: BiNews,
    },
    {
      path: "/pets",
      title: "Thú cưng",
      icon: TbPaw,
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
      icon: UserCircleIcon,
    },

  ];

  useEffect(() => {
    const activeLinkIndex = menuItems.findIndex((item) => item.path === router.asPath);
    setActiveLink(activeLinkIndex >= 0 ? activeLinkIndex : 0);
  }, [router.asPath]);

  const handleSidebarRowClick = (index) => {
    setActiveLink(index);
    router.push(`/?activeLink=${index}`);
  };

  return (
    <div className='hidden flex-shrink-0 sm:flex lg:flex md:flex w-[300px] xl:flex xl:flex-col bg-white h-screen xl:w-[275px] sm:w-[80px] fixed border-r-2 pt-4  border-gray-200'>    
      <div className=''>

        {/* Logo */}
          {/* <a className='flex justify-center items-center p-4 my-3 cursor-pointer' href='/'>
            <Image 
              className=''
              src={logo} 
              alt="Logo" 
              width={35} 
              height={35} 
              layout='fixed' 
            />
            <Image 
              className='ml-3 xl:flex hidden'
              src={logoName} 
              alt="Petournal" 
              width={100} 
              height={100} 
              layout='fixed' 
            />   
          </a> */}

        {/* Menubar */}
        <div className=" pt-2 sm:px-2 md:px-2 xl:px-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div onClick={() => handleSidebarRowClick(index)}>
                <SidebarRow
                  Icon={item.icon}
                  title={item.title}
                  active={router.asPath === item.path}
                />
              </div>
            </Link>
          ))}
     
          <div className="mt-4 mx-4 border-b-2"></div>
          <div className='mt-4'>
            <Link href="/settings">
              <div>
                <SidebarRow Icon={CogIcon} title="Cài đặt" active={router.asPath === "/settings"} />  
              </div>
            </Link>

            <Link href="/login">
              <div>
                <SidebarRow Icon={LogoutIcon} title="Đăng xuất" active={router.asPath === "/signin"} /> 
              </div>
            </Link>
            
          </div>
        </div>
      </div>   
    </div>
  )
}

export default React.memo(Sidebar);
