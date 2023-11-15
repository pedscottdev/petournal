"use client";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import PostCard from "./PostCard";
import { AnnotationIcon, SearchIcon, BellIcon } from "@heroicons/react/outline";

import TimeLineService from "../core/services/time-line.service";

function Feed() {
    const [listPost, setListPost] = useState();

    useEffect(() => {
        getTimeLine();
    }, []);

    const getTimeLine = async () => {
        const { data } = await TimeLineService.getTimeLine();
        setListPost(data);
    };

    return (
        <div className=" p-6 pl-0 flex-col flex-shrink-0 overflow-x-hidden display-block min-h-screen md:w-xl">
            <div className="">
                {/* InputBox */}
                <InputBox />
            </div>

            {/* Posts */}
            {listPost?.map((post) => {
                return <PostCard key={post._id} postId={post._id} isUserFollowing={post?.isFollowing} isUserLiked={post?.isLiked} />;
            })}
        </div>
    );
}

export default Feed;
