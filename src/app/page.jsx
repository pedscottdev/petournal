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
        <div className="flex grid-cols-3">
          <div className="w-[70%]">
            <Feed />
          </div>

          {/* Widgets */}
          <div className="w-[30%]">
            <Widgets />
          </div>
        </div>
    </main>
  )
}
