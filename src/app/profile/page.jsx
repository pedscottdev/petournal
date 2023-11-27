"use client";
import React, { useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import Head from "next/head";
import defaultAvatar from "/src/img/default-avatar.png";
import bgImg from "/src/img/bg-image.png";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import ProfileTabs from "../../components/ProfileTabs";
import InputBox from "../../components/InputBox";
import PostCard from "../../components/PostCard";
import ProfileCard from "../../components/ProfileCard";
import PetProfileCard from "../../components/PetProfileCard";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import {
  SearchIcon,
  InformationCircleIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { TbDog } from "react-icons/tb";
import PetsAvatar from "../../utils/PetsAvatar";

function profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isFollowing) {
      alert("Đã theo dõi");
    } else {
      alert("Đã hủy theo dõi");
    }

    setIsLoading(false);

    setIsFollowing((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main>
        <div className="flex w-full flex-col flex-auto bg-gray-400 border-b border-gray-200">
          <div className="w-full overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1615715616181-6ba85d724137?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-28 object-cover"
            />
            <div className="flex justify-center -mt-8">
              <Image
                src={defaultAvatar}
                className="rounded-full object-cover border-solid w-24 h-24 border-white border-3 -mt-3"
                width={128}
                height={128}
                quality={100}
                alt="avatar"
              />
            </div>
            <div className="text-center px-3 pb-4 pt-2 rounded-t-xl">
              <h3 className="text-gray-700 text-xl font-bold ">Pedro Scott</h3>
              <p className=" text-[15px]">
                Hello, i'm from another the other side!
              </p>
              <p className="mt-2 text-sm text-gray-500">
                pedscottdev@gmail.com
              </p>
            </div>

            {/* Controller */}
            <div className="flex items-center justify-center ">
              <div className="flex justify-center divide-x divide-gray-300py-2 pb-3">
                <div className="flex flex-col text-center px-6">
                  <div className="text-[15px]">Pet</div>
                  <span className="text-md font-semibold flex flex-col text-center">
                    2
                  </span>
                </div>
                <div className="flex flex-col text-center px-6 justify-center">
                  <div className="text-[15px]">Follower</div>
                  <span className="text-md font-semibold flex flex-col text-center">
                    49{" "}
                  </span>
                </div>
                <div className="flex flex-col text-center px-6   justify-center">
                  <div className="text-[15px]">Following</div>
                  <span className="text-md font-semibold flex flex-col text-center">
                    344
                  </span>
                </div>
              </div>
              <div className="flex items-center ">
                <div className="flex items-center space-x-5  justify-center w-full  px-4 py-5">
                  <Link href="">
                    <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
                      Thay đổi hình đại diện
                    </button>
                  </Link>

                  <button
                    className={`${
                      isFollowing ? "bg-violet-50" : "bg-gray-100"
                    } active:scale-[.94] active:duration-75 transition-all p-2 font-medium ${
                      isFollowing ? "text-violet-600" : "text-gray-600"
                    } text-[15px] px-4 rounded-full text-s md:text-base`}
                    onClick={handleButtonClick}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center px-6 justify-center w-6 h-6">
                        <CircularProgress
                          size="sm"
                          color="secondary"
                          aria-label="Loading..."
                        />
                      </div>
                    ) : isFollowing ? (
                      "Theo dõi"
                    ) : (
                      "Đang theo dõi"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col  ">
          <Tabs
            aria-label="Options"
            color="secondary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full flex justify-center relative bg-white rounded-none p-0 border-b border-divider ",
              cursor: "w-full bg-[#7C3AED]",
              tab: "max-w-fit px-0 h-12",
              tabContent:
                "text-[16px] font-semibold group-data-[selected=true]:text-[#7C3AED] ",
            }}
          >
            <Tab
              key="feeds"
              title={
                <div className="flex items-center space-x-2">
                  <span>Nhật ký</span>
                </div>
              }
            >
              {/* Contents */}
              <div className="flex space-y-4 px-6 justify-center ">
                {/* Controller */}
                <div className="flex flex-col min-w-[70%] max-w-[70%] gap-x-5 h-full my-4">
                  <InputBox />

                  {/* Pets Filter */}
                  <div className="flex gap-4 items-center justify-center mt-5">
                    <PetsAvatar
                      petAvatar="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <PetsAvatar
                      petAvatar="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
                    />
                    <PetsAvatar
                      petAvatar="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />

                  </div>

                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                </div>
              </div>
            </Tab>
            <Tab
              key="pets"
              title={
                <div className="flex items-center space-x-2">
                  <span>Thú cưng</span>
                </div>
              }
            >
              {/* Contents */}
              <div className="space-y-4  ">
                <div className="flex justify-end gap-x-5 w-full  h-full my-4">
                  {/* Search */}
                  <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-2 mx-3 w-[]">
                    <SearchIcon className="h-4 ml-2 text-gray-500" />
                    <input
                      className=" flex ml-4 bg-transparent outline-none text-[15px] text-gray-500 flex-shrink min-w-[20rem]"
                      type="text"
                      placeholder="Tìm kiếm theo tên"
                    ></input>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-3 pt-3 gap-6 p-4">
                  <PetProfileCard
                    petAvatar="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    petName="Sammy"
                    breed="Corki"
                    sex="Đực"
                    age="3"
                    likes="48"
                  />
                  <PetProfileCard
                    petAvatar="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    petName="Sammy"
                    breed="Corki"
                    sex="Đực"
                    age="3"
                    likes="48"
                  />
                  <PetProfileCard
                    petAvatar="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    petName="Sammy"
                    breed="Corki"
                    sex="Đực"
                    age="3"
                    likes="48"
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="followers"
              title={
                <div className="flex items-center space-x-2">
                  <span>Thông tin cơ bản</span>
                </div>
              }
            >
              {/* Contents */}
              <div className="space-y-4 flex justify-center p-6">
                <div className="flex-1 w-[70%] bg-white rounded-xl shadow-sm p-8">
                  <h4 className="text-xl text-gray-900 font-bold">
                    Thông tin cơ bản
                  </h4>
                  <ul className="mt-4 text-gray-700 text-[15px]">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-32">Mô tả bản thân:</span>
                      <span className="text-gray-700 ml-6">
                        Hello, i'm from another the other side!
                      </span>
                    </li>
                    <li className="flex border-y py-2">
                      <span className="font-bold w-32">Tên đầy đủ:</span>
                      <span className="text-gray-700 ml-6">Pedro Scott</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-32">Ngày sinh:</span>
                      <span className="text-gray-700 ml-6">24 Jul, 1991</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-32">Email:</span>
                      <span className="text-gray-700 ml-6">
                        pedscottdev@gmail.com
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-32">Số điện thoại:</span>
                      <span className="text-gray-700 ml-6">0987878787</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-32">Địa chỉ:</span>
                      <span className="text-gray-700 ml-6">
                        Thành phố Hồ Chí Minh
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </main>
    </>
  );
}

export default React.memo(profile);
