"use client";
import React, { useContext, useEffect, useRef } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import nprogress from "nprogress";
import Image from "next/image";
import { useSelector } from "react-redux";
import { store } from "../core/store";
import { useRouter } from "next/navigation";
// import io from "socket.io-client";

export default function Home() {
    const router = useRouter();
    const accessToken = store.getState().user.accessToken;
    useEffect(() => {
        if (!accessToken) {
            router.push("/login");
        }
    }, [accessToken]);

    return (
        <main>
            <div className="flex grid-cols-2 px-6 justify-center">
                <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full">
                    <Feed />
                </div>

                {/* Widgets */}
                <div className="min-w-[30%] lg:flex xl:flex md:hidden sm:hidden">
                    <Widgets />
                </div>
            </div>
        </main>
    );
}
