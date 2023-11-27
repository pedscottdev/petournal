"use client";
import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/react";
import ProfileCard from "../../components/ProfileCard";

function follower() {
  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main className="h-full ">
        <div className="p-6 ">
          {/* Header */}
          <div className="text-2xl font-semibold mb-1">Cộng đồng</div>

          {/* Controller */}
          <div className="overflow-y-hidden">
            {/* Tabs */}
            <div className="flex w-full flex-col ">
              <Tabs
                aria-label="Options"
                color="secondary"
                variant="underlined"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
                  cursor: "w-full bg-[#7C3AED]",
                  tab: "max-w-fit px-0 h-12",
                  tabContent:
                    "text-[16px] font-semibold group-data-[selected=true]:text-[#7C3AED]",
                }}
              >
                <Tab
                  key="followings"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Đang theo dõi</span>
                      <Chip size="sm" variant="faded">
                        9
                      </Chip>
                    </div>
                  }
                >
                  {/* Contents */}
                  <div className="space-y-1">
                    {/* Controller */}
                    <div className="flex justify-between gap-x-5 w-full  h-full my-2">
                      <Select
                        radius="sm"
                        variant="bordered"
                        placeholder="Sắp xếp"
                        labelPlacement="outside"
                        className=" h-full w-[15%] bg-white"
                        selectorIcon={<TbSelector />}
                      >
                        <SelectItem key="newest" value="newest">
                          Mới nhất
                        </SelectItem>
                        <SelectItem key="oldest" value="oldest">
                          Cũ nhất
                        </SelectItem>
                        <SelectItem key="increasing" value="increasing">
                          Từ A-Z
                        </SelectItem>
                      </Select>

                      {/* Search */}
                      <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-1 mx-3 w-[]">
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
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="Elisa Belleridge"
                        gmail="elisabelleridge@gmail.com"
                        pet="3"
                        follower="48"
                        following="21"
                      />
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center pt-2">
                      <Pagination
                        isCompact
                        showControls
                        key="following"
                        total={10}
                        initialPage={1}
                        color="secondary"
                      />
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="followers"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Người theo dõi</span>
                      <Chip size="sm" variant="faded">
                        3
                      </Chip>
                    </div>
                  }
                >
                  {/* Contents */}
                  <div className="space-y-4 ">
                    {/* Controller */}
                    <div className="flex justify-between gap-x-5 w-full  h-full my-4">
                      <Select
                        radius="sm"
                        variant="bordered"
                        placeholder="Sắp xếp"
                        labelPlacement="outside"
                        className=" h-full w-[15%] bg-white"
                        selectorIcon={<TbSelector />}
                      >
                        <SelectItem key="newest" value="newest">
                          Mới nhất
                        </SelectItem>
                        <SelectItem key="oldest" value="oldest">
                          Cũ nhất
                        </SelectItem>
                        <SelectItem key="increasing" value="increasing">
                          Từ A-Z
                        </SelectItem>
                      </Select>

                      {/* Search */}
                      <div className="flex flex-row  ml-2 items-center rounded-lg border-2 border-gray-200 bg-[#ECEDF6] py-1 mx-3 w-[]">
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
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                      <ProfileCard 
                        userAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        userName="James Barnado"
                        gmail="jamesbarnado.com"
                        pet="1"
                        follower="480"
                        following="981"
                      />
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center pt-2">
                      <Pagination
                        isCompact
                        showControls
                        key="following"
                        total={10}
                        initialPage={1}
                        color="secondary"
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default React.memo(follower);
