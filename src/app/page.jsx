"use client";
import React from "react";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import withAuth from "../middleware/withAuth";

const Home = () => {
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
};

export default withAuth(Home);
