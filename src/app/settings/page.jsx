"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserService from "../../core/services/user.service";
import { setToken, updateUserState } from "../../core/store/feature/user-slice";
import { useDispatch, useSelector } from "react-redux";

function settings() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("profile");

    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        getUserLogin();
    }, []);

    const getUserLogin = async () => {
        const { data } = await UserService.getUserById(user.id);

        // Assuming data.birthday is in ISO format "yyyy-MM-ddTHH:mm:ss.SSSZ"
        const birthdayDate = new Date(data.birthday);
        // Format the date as "yyyy-MM-dd"
        const formattedBirthday = birthdayDate.toISOString().split("T")[0];

        setBirthday(formattedBirthday);
        setPhone(data.phone);
        setAddress(data.address);
    };

    const handleUpdateUser = async () => {
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            birthday: birthday,
            address: address,
        };
        mutationUpdateUser.mutate(body);
    };

    const mutationUpdateUser = useMutation({
        mutationFn: async (data) => {
            const response = await UserService.updateUser(data);
            return response;
        },
        onSuccess: ({data}) => {
            dispatch(updateUserState(data));
            toast.success("Cập nhật thành công");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleChangePassword = async () => {
        const body = { password: password, newPassword: newPassword, confirmNewPassword: confirmNewPassword };
        if (isValidDataPassword(body)) {
            mutationChangePassword.mutate(body);
        }
    };

    const mutationChangePassword = useMutation({
        mutationFn: async (data) => {
            const response = await UserService.changePassword(data);
            return response.data;
        },
        onSuccess: async (data) => {
            const { accessToken } = data.result;
            await dispatch(setToken(accessToken));
            toast.success("Đổi mật khẩu thành công");
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return (
        <>
            <Head>
                <title>Petournal</title>
            </Head>

            <main className="">
                <div className="bg-[#fbfbfb] border-b border-gray-200 dark:border-gray-700 ">
                    <ul
                        className="border-b-2 border-gray-200 flex flex-wrap -mb-px font-semibold text-center"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li className="mr-2" role="presentation">
                            <button
                                className={`inline-block p-4 border-b-3 text-gray-700 rounded-t-lg ${
                                    activeTab === "profile" ? "border-violet-600" : ""
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
                                className={`inline-block p-4 border-b-3 text-gray-700 rounded-t-lg ${
                                    activeTab === "dashboard" ? "border-violet-600 dark:border-white" : ""
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
                                className={`inline-block p-4 border-b-3 text-gray-700 rounded-t-lg ${
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
                            className={` bg-white rounded-lg divide-y divide-default-200 ${
                                activeTab === "profile" ? "block" : "hidden"
                            }`}
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            <div className="grid gap-4 gap-y-8 p-10 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="">
                                    <p className="text-[16px] mb-1 font-semibold text-gray-700">Thông tin cá nhân</p>
                                    <p className="font-md pr-6">
                                        Bạn có thể cập nhật thông tin cá nhân bằng cách chỉnh sửa và bấm lưu .
                                    </p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-3">
                                            <label htmlFor="family_name" className="font-medium">
                                                Họ
                                            </label>
                                            <input
                                                type="text"
                                                id="family_name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label htmlFor="first_name" className="font-medium">
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label htmlFor="email" className="font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                                readOnly={true}
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="birthday" className="font-medium">
                                                Ngày sinh
                                            </label>
                                            <input
                                                type="date"
                                                id="birthday"
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="phone" className="font-medium">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label htmlFor="address" className="font-medium">
                                                Địa chỉ
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-6 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 my-4 px-4 rounded"
                                                    onClick={handleUpdateUser}
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 gap-y-8 p-10 text-sm grid-cols-1 lg:grid-cols-3 ">
                                <div className="">
                                    <p className="text-[16px] mb-1 font-semibold text-gray-700">Đổi mật khẩu</p>
                                    <p className="font-md pr-6">Thay đổi mật khẩu đăng nhập.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-6">
                                            <label htmlFor="password" className="font-medium">
                                                Mật khẩu hiện tại
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <label htmlFor="new_password" className="font-medium">
                                                Mật khẩu mới
                                            </label>
                                            <input
                                                type="password"
                                                id="new_password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <label htmlFor="confirm_new_password" className="font-medium">
                                                Xác nhận mật khẩu mới
                                            </label>
                                            <input
                                                type="password"
                                                id="confirm_new_password"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 px-4 mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-6 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 my-4 rounded"
                                                    type="button"
                                                    onClick={handleChangePassword}
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {isModalOpen && (
              <div
                id="popup-modal"
                className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                      </h3>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
                        <div
                            className={`p-8 bg-white rounded-lg  dark:bg-gray-800 ${
                                activeTab === "dashboard" ? "block" : "hidden"
                            }`}
                            id="dashboard"
                            role="tabpanel"
                            aria-labelledby="dashboard-tab"
                        >
                            <p className="text-md text-gray-500 dark:text-gray-400">Hướng dẫn sơ về cài đặt</p>
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

const isValidDataPassword = (data) => {
    const errors = [];

    if (!data.newPassword) {
        errors.push("Vui lòng nhập mật khẩu");
    } else if (data.newPassword.length < 8) {
        errors.push("Mật khẩu phải có ít nhất 8 ký tự ");
    }

    if (!data.confirmNewPassword) {
        errors.push("Vui lòng nhập xác nhận mật khẩu");
    } else if (data.confirmNewPassword !== data.newPassword) {
        errors.push("Mật khẩu không trùng khớp");
    }

    errors.forEach((err) => {
        toast.error(err);
    });

    return errors.length === 0;
};
