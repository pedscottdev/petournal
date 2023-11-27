import React from "react";
import Head from "next/head";

function profile() {
  return (
    <>
      <Head>
        <title>Petournal</title>
      </Head>

      <main>
        <div className="flex flex-col p-6 justify-center items-center">
          <div className="flex flex-col items-center p-6 bg-white shadow-sm border-1 rounded-t-2xl xl:w-[70%] lg:w-[70%] md:w-full sm:w-full">
            <div className="">
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover h-32 w-32 rounded-full"
              />
            </div>
            <div className="flex  text-center justify-center">
              <div className="text-2xl font-semibold">Sammy</div>
              <div className="text-sm text-gray-500 ">Chó Anh lông dài</div>
              <div className="flex  mx-6 divide-x divide-gray-300 items-center mt-4 mb-2 justify-start">
            <div className="flex flex-col px-5 justify-center">
              <span className="text-md font-semibold flex flex-col text-center">
                Đực
              </span>
              <div className="text-sm font-medium text-gray-400">Giới tính</div>
            </div>
            <div className="flex flex-col px-5 justify-center text-center">
              <span className="text-md font-semibold flex flex-col ">
                3
              </span>
              <div className="text-sm font-medium text-gray-400">Tuổi</div>
            </div>
            <div className="flex flex-col px-5 backdrop:justify-center">
              <span className="text-md font-semibold flex flex-col text-center">
                48
              </span>
              <div className="text-sm font-medium text-gray-400">
                Lượt thích
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default profile;
