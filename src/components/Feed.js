"use client";
import React from 'react'
import InputBox from './InputBox'
import PostCard from './PostCard'
import { 
  AnnotationIcon,
  SearchIcon,
  BellIcon, 
 } from '@heroicons/react/outline'; 

function Feed() {
  return (
    <div className='flex-col flex-shrink-0 overflow-x-hidden display-block min-h-screen border-r-2 border-gray-200 md:w-xl bg-white'>
        {/* InputBox */}
        <InputBox />

        {/* Posts */}
        <PostCard />
    </div>
  )
}

export default Feed