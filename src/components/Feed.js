"use client";
import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import PostCard from "./PostCard";
import EmptyFeed from "../utils/EmptyFeed";

import TimeLineService from "../core/services/time-line.service";
import { useMutation } from "@tanstack/react-query";

function Feed() {
    const [listPost, setListPost] = useState([]);
    const [page, setPage] = useState(2);

    useEffect(() => {
        getTimeLine().catch(console.error);
    }, []);

    const getTimeLine = async () => {
        const { data } = await TimeLineService.getTimeLine();
        setListPost(data);
    };

    const resetPage = async () => {
        await setPage(2);
    };

    const mutation = useMutation({
        mutationFn: async (data) => {
            const body = { page: data };
            const result = await TimeLineService.getTimeLine(body);
            return result.data;
        },
        onSuccess: async (data) => {
            await setListPost((preList) => [...preList, ...data]);
            await setPage((prevPage) => prevPage + 1);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        // Check if the user has scrolled to the bottom 10% of the page
        if (scrollPosition > documentHeight - windowHeight * 1.5 && !mutation.isPending) {
            mutation.mutate(page);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className=" p-6 pl-0 flex-col flex-shrink-0 overflow-x-hidden overflow-y-auto display-block min-h-screen md:w-xl">
            <div className="">
                {/* InputBox */}
                <InputBox handleGetTimeLine={getTimeLine} handleResetPage={resetPage} />
            </div>

            {/* Posts */}
            {listPost.length > 0 &&
                listPost?.map((post) => {
                    return (
                        <PostCard
                            key={post._id}
                            variant={post.pets.length == 0 ? "group" : null}
                            postId={post._id}
                            isUserFollowing={post?.isFollowing}
                            isUserLiked={post?.isLiked}
                            handleGetTimeLine={getTimeLine}
                            handleResetPage={resetPage}
                        />
                    );
                })}
            {listPost.length == 0 && <EmptyFeed />}
        </div>
    );
}

export default Feed;
