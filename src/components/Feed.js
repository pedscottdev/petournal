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
    <div className=' p-6 pl-0 flex-col flex-shrink-0 overflow-x-hidden display-block min-h-screen md:w-xl'>
      <div  className=''>
        {/* InputBox */}
        <InputBox />
      </div>
        
        {/* Posts */}
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
    </div>
  )
}

export default Feed