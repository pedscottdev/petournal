"use client";
import React from "react";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import logoImage from "/src/img/logo-name.svg";
import Link from "next/link";

function page() {
  return (
    <div className="flex w-full h-screen">
      {/* Background */}
      <div className="hidden lg:flex h-full w-1/2 bg-violet-300 justify-center items-center">
        {/* <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-violet-800 rounded-full'> */}
        <Image src={bgImage} alt="background-image" />
        {/* </div> */}
      </div>

      {/* Form */}
      <form
        className="flex items-center justify-center bg-white w-full lg:w-1/2 px-10"
      >
        <div>
          <h1 className="text-4xl font-bold"> Đặt lại mật khẩu</h1>
          <p className="text-lg mt-3.5">
            Xác nhận email thành công. Hãy đặt lại mật khẩu.
          </p>

          {/* Input Field */}
          <div className="mt-8">

            <div className="mt-4">
              <input
                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                placeholder="Mật khẩu mới"
                id="password"
              />
            </div>
            <div className="mt-4">
              <input
                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                placeholder="Xác nhận mật khẩu mới"
                id="confirm-password"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                className="active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl flex justify-center text-white bg-violet-500 text-lg font-semibold"
                type="submit"
              >
                Lấy lại mật khẩu
              </button>
            </div>

            <Link href="/login">
              <div className="mt-8 flex justify-center items-center">
                <button className="text-violet-500 textbase font-medium ml-2">
                  Quay lại trang đăng nhập
                </button>
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default page;