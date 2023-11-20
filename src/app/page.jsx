"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import nprogress from "nprogress";
import Image from "next/image";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { setSocket } from "../core/store/feature/user-slice";

export default function Home() {
    const user = useSelector((state) => state.user);
    const socket = useRef();
    useEffect(() => {
        socket.current = io(process.env.HOST, {
            extraHeaders: { Authorization: `${user.accessToken}` },
        });
        socket.current.on("connect", () => {
            console.log("Connected to WebSocket id: " + socket.current.id);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [user.accessToken]);

    return (
        <main>
            <div className="flex grid-cols-2 px-4 justify-center">
                <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full">
                    <Feed socket={socket} />
                </div>

                {/* Widgets */}
                <div className="min-w-[30%] lg:flex xl:flex md:hidden sm:hidden">
                    <Widgets />
                </div>
            </div>
        </main>
    );
}
