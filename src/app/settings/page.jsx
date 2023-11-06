"use client"
import React, { useState } from 'react';
import Head from "next/head";
import Sidebar from "../../components/Sidebar";

function settings() {

  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main className=''>
        <div className="bg-[#F8FAFC] border-b border-gray-200 dark:border-gray-700 ">
          <ul
            className="border-b-2 border-gray-200 flex flex-wrap -mb-px font-semibold text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "profile"
                    ? "border-violet-600"
                    : ""
                }`}
                id="profile-tab"
                data-tabs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected={activeTab === "profile"}
                onClick={() => handleTabClick("profile")}
              >
                Thông tin cá nhân
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "dashboard"
                    ? "border-violet-600 dark:border-white"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                id="dashboard-tab"
                data-tabs-target="#dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected={activeTab === "dashboard"}
                onClick={() => handleTabClick("dashboard")}
              >
                Cài đặt và hỗ trợ
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-violet-600 dark:border-white"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                id="settings-tab"
                data-tabs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected={activeTab === "settings"}
                onClick={() => handleTabClick("settings")}
              >
                Thông tin khóa luận
              </button>
            </li>
          </ul>

          <div id="default-tab-content">
            <div
              className={`p-8 bg-white rounded-lg dark:bg-gray-800 ${
                activeTab === "profile" ? "block" : "hidden"
              }`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className=''>
                <p className="text-md font-semibold text-gray-700">
                  Thông tin cá nhân
                </p>
                <p className='font-md'>Bạn có thể cập nhật thông tin cá nhân bằng cách chỉnh sửa và bấm lưu .</p>
              </div>
              
            </div>
            <div
              className={`p-8 bg-white rounded-lg  dark:bg-gray-800 ${
                activeTab === "dashboard" ? "block" : "hidden"
              }`}
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className="text-md text-gray-500 dark:text-gray-400">
                Hướng dẫn sơ về cài đặt
              </p>
            </div>
            <div
              className={`p-8 rounded-lg bg-white dark:bg-gray-800 ${
                activeTab === "settings" ? "block" : "hidden"
              }`}
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <p className="text-md text-gray-500 dark:text-gray-400">
                Thông tin sinh viên làm khóa luận.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default React.memo(settings);
