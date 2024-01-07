"use client";
import React from "react";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../../core/services/auth.service.js";
import { useForm } from "react-hook-form";
import ErrorField from "../../../components/share/error-field.js";
import Loading from "../../../components/share/loading.js";
import defaultAvatar from "/src/img/default-avatar.png";
import toast from "react-hot-toast";

function Signup() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data) => {
            return AuthService.register(data);
        },
        onSuccess: () => {
            toast.success("Đăng ký thành công");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleRegister = (values) => {
        if (isValidUserData(values)) {
            mutation.mutate({ ...values, avatar: defaultAvatar.src });
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                onSubmit={handleSubmit(handleRegister)}
            >
                <div>
                    <h1 className="text-4xl font-bold"> Đăng ký</h1>
                    <p className="text-lg mt-3.5">Tạo tài khoản nhanh chóng và dễ dàng.</p>

                    {/* Input Field */}
                    <div className="mt-8">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input
                                    className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                    placeholder="Họ"
                                    id="lastName"
                                    {...register("lastName")}
                                />
                                <ErrorField sub={errors.firstName?.message} />
                            </div>

                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Tên"
                                id="firstName"
                                {...register("firstName")}
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Email"
                                id="email"
                                {...register("email")}
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Mật khẩu"
                                type="password"
                                id="password"
                                {...register("password")}
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Nhập lại mật khẩu"
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword")}
                            />
                        </div>

                        <div className="mt-4">
                            <input id="lisenced" type="checkbox" {...register("isAcceptCondition")} />
                            <label className="ml-2  text-base">Tôi đồng ý với các điều khoản và điều kiện</label>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button
                                className="active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl flex justify-center text-white bg-violet-500 text-lg font-semibold"
                                type="submit"
                            >
                                {mutation.isPending ? <Loading /> : "Đăng ký"}
                            </button>
                        </div>

                        <Link href="/login">
                            <div className="mt-8 flex justify-center items-center">
                                <div className="text-violet-500 textbase font-medium ml-2">
                                    Chuyển đến trang đăng nhập
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;

const isValidUserData = (data) => {
    if (!data.lastName) {
        toast.error("Vui lòng nhập Họ");
    } else if (!data.firstName) {
        toast.error("Vui lòng nhập Tên");
    } else if (!data.email) {
        toast.error("Vui lòng nhập email");
    } else if (!isValidEmail(data.email)) {
        toast.error("Vui lòng nhập email hợp lệ");
    } else if (!data.password) {
        toast.error("Vui lòng nhập mật khẩu");
    } else if (data.password.length < 8) {
        toast.error("Mật khẩu phải có ít nhất 8 ký tự ");
    } else if (!data.confirmPassword) {
        toast.error("Vui lòng nhập xác nhận mật khẩu");
    } else if (data.confirmPassword !== data.password) {
        toast.error("Mật khẩu không trùng khớp");
    } else if (data.isAcceptCondition !== true) {
        toast.error("Vui lòng chấp nhận điều khoản");
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};
