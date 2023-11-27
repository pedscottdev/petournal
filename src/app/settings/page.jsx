"use client";
import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import "../globals.css"

function settings() {
  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main className="">
        <div className="bg-[#fbfbfb] border-b border-gray-200 dark:border-gray-700 ">
          <Tabs
            aria-label="Options"
            color="secondary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
              cursor: "w-full bg-[#7C3AED]",
              tab: "max-w-fit ml-3 py-0 h-14",
              tabContent:
                "text-[16px] py-0 px-0 font-semibold group-data-[selected=true]:text-[#7C3AED]",
            }}
          >
            <Tab
              key="user"
              title={
                <div className="flex items-center space-x-2">
                  <span>Thông tin cá nhân</span>
                </div>
              }
              className="px-0 py-0"
            >
              {/* Contents */}
              <div className="bg-white border-t border-gray-200 divide-y divide-gray-200">
                <div className="grid gap-4 gap-y-8 p-10 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="">
                    <p className="text-[16px] mb-1 font-semibold text-gray-700">
                      Thông tin cá nhân
                    </p>
                    <p className="font-md pr-6">
                      Bạn có thể cập nhật thông tin cá nhân bằng cách chỉnh sửa
                      và bấm lưu .
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                      <div className="md:col-span-3">
                        <label for="family_name" className="font-medium">
                          Họ
                        </label>
                        <input
                          type="text"
                          id="family_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label for="first_name" className="font-medium">
                          Tên
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-6">
                        <label for="vio" className="font-medium">
                          Mô tả bản thân
                        </label>
                        <textarea
                          type="text"
                          id="bio"
                          rows={3}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-6">
                        <label for="email" className="font-medium">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                          readOnly={true}
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label for="birthday" className="font-medium">
                          Ngày sinh
                        </label>
                        <input
                          type="text"
                          id="birthday"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label for="phone" className="font-medium">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          id="phone"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-6">
                        <label for="address" className="font-medium">
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          id="address"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-6 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 my-4 px-4 rounded">
                            Lưu lại
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 gap-y-8 p-10 text-sm grid-cols-1 lg:grid-cols-3 ">
                  <div className="">
                    <p className="text-[16px] mb-1 font-semibold text-gray-700">
                      Đổi mật khẩu
                    </p>
                    <p className="font-md pr-6">Thay đổi mật khẩu đăng nhập.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                      <div className="md:col-span-6">
                        <label for="password" className="font-medium">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          id="new_password"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <label for="new_password" className="font-medium">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          id="new_password"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <label
                          for="confirm_new_password"
                          className="font-medium"
                        >
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          id="confirm_new_password"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                        />
                      </div>

                      <div className="md:col-span-6 text-right">
                        <div className="inline-flex items-end">
                          <button
                            className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 my-4 rounded"
                            type="button"
                          >
                            Lưu lại
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              key="others"
              title={
                <div className="flex items-center space-x-2">
                  <span>Thông tin khóa luận</span>
                </div>
              }
            >
              {/* Contents */}
              <div className="bg-white">dddddđd</div>
            </Tab>
          </Tabs>
        </div>
      </main>
    </>
  );
}

export default React.memo(settings);
