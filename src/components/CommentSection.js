import React from "react";
import Image from "next/image";
import defaultAvatar from "/src/img/default-avatar.png";
import logoName from "/src/img/logo-name.png";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { MdSubdirectoryArrowRight, MdKeyboardArrowUp } from "react-icons/md";

function CommentSection() {
  return (
    <div className="mt-4">
      <div className="antialiased w-full">
        {/* <h3 className="my-4 text-lg font-semibold text-gray-900">
              Comments
            </h3> */}

        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 border-2 border-gray-100 rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed">
              <div className="flex items-center">
                <p className="font-semibold">Sarah</p>
                <span className="ml-2 text-sm text-gray-400">3:34 PM</span>
              </div>

              <p className="text-[15px]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <div className="mt-4 flex space-x-6 items-center">
                <div className="flex -space-x-2 ">
                  <MdSubdirectoryArrowRight className="h-5 w-5 mr-4" />
                  <div className="text-sm text-gray-500 font-semibold cursor-pointer">
                    Hiển thị <span>5</span> bình luận
                  </div>
                </div>

                <button className="text-sm text-gray-500 font-semibold">
                  Phản hồi
                </button>
              </div>

              {/* Input */}
              <div className="flex space-x-4 mt-4">
                <Image
                  className="rounded-full cursor-pointer w-10 h-10"
                  src={defaultAvatar}
                  // width={48}
                  // height={48}
                />

                <div className="w-full">
                  <div className={``}>
                    <input
                      type="text"
                      className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[42px]"
                      placeholder="Trả lời @Sarah"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <div className="flex items-center">
                <p className="font-semibold">Sarah</p>
                <span className="ml-2 text-sm text-gray-400">3:34 PM</span>
              </div>
              <p className="text-[15px]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex -space-x-2 mr-2">
                  <MdKeyboardArrowUp className="h-6 w-6" />
                </div>
                <div className="text-sm text-gray-500 font-semibold cursor-pointer">
                  Ẩn phản hồi
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <div className="flex items-center">
                      <p className="font-semibold">Sarah</p>
                      <span className="ml-2 text-sm text-gray-400">
                        3:34 PM
                      </span>
                    </div>
                    <p className="text-[15px]">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <div className="flex items-center">
                      <p className="font-semibold">Sarah</p>
                      <span className="ml-2 text-sm text-gray-400">
                        3:34 PM
                      </span>
                    </div>
                    <p className="text-[15px]">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                    </p>
                  </div>
                </div>

                {/* Input */}
                <div className="flex space-x-4 mt-4">
                  <Image
                    className="rounded-full cursor-pointer w-10 h-10"
                    src={defaultAvatar}
                    // width={48}
                    // height={48}
                  />

                  <div className="w-full">
                    <div className={``}>
                      <input
                        type="text"
                        className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[42px]"
                        placeholder="Trả lời @Sarah"
                      ></input>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
