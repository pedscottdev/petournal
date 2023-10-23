"use client"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import React, { createRef, useEffect } from "react";
import "./globals.css";
import { Inter } from 'next/font/google'

const font = Inter ({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <Sidebar />
        <div className="w-fit sm:ml-[80px] xl:ml-[275px]">
          {children}
        </div>   
      </body>
    </html>
  )
}
