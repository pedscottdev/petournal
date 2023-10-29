"use client"
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import nprogress from "nprogress";
import Image from 'next/image'

export default function Home() {
  return (
    <main>
        <div className="flex grid-cols-3 px-6">
          <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full" >
            <Feed />
          </div>

          {/* Widgets */}
          <div className="w-inherit lg:flex xl:flex md:hidden sm:hidden">
            <Widgets />
          </div>
        </div>
    </main>
  )
}
