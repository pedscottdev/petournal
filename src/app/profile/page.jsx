import React from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Sidebar from '../../components/Sidebar'
import ProfileTabs from '../../components/ProfileTabs'
import { 
  SearchIcon,
  InformationCircleIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon, 
 } from '@heroicons/react/outline';
 import { 
  TbDog,
 } from 'react-icons/tb';
import defaultAvatar from '/src/img/default-avatar.png'; 
import RootLayout from '../layout';

function profile() {
  return (
    <>      
      <RootLayout>
        
      </RootLayout>
    </>
  )
}

export default React.memo(profile);