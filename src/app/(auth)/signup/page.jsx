"use client";
import React from "react";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../../core/services/auth.js";
import { useForm } from "react-hook-form";
import ErrorField from "../../../components/share/error-field.js";
import Loading from "../../../components/share/loading.js";

function Signup() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data) => {
            return AuthService.register(data);
        },
        onSuccess: (data) => {
            toast.success("Đăng ký thành công");
            router.push("/login")
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response.data.message);
        },
    });

    const handleRegister = (values) => {
        if (isValidUserData(values)) {
            mutation.mutate(values);
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
                                <button className="text-violet-500 textbase font-medium ml-2">
                                    Chuyển đến trang đăng nhập
                                </button>
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
    const errors = [];

    if (!data.lastName) {
        errors.push("Vui lòng nhập Tên");
    }

    if (!data.email) {
        errors.push("Vui lòng nhập email");
    } else if (!isValidEmail(data.email)) {
        errors.push("Vui lòng nhập email hợp lệ");
    }

    if (!data.password) {
        errors.push("Vui lòng nhập mật khẩu");
    } else if (data.password.length < 8) {
        errors.push("Mật khẩu phải có ít nhất 8 ký tự ");
    }

    if (!data.confirmPassword) {
        errors.push("Vui lòng nhập xác nhận mật khẩu");
    } else if (data.confirmPassword !== data.password) {
        errors.push("Mật khẩu không trùng khớp");
    }

    if (data.isAcceptCondition !== true) {
        errors.push("Vui lòng chấp nhận điều khoản");
    }

    errors.forEach((err) => {
        toast.error(err);
    });

    return errors.length === 0;
};

const isValidEmail = (email) => {
    // Kiểm tra xem chuỗi email có đúng định dạng email không. Bạn có thể sử dụng biểu thức chính quy (regex) hoặc thư viện hỗ trợ kiểm tra email.
    // Dưới đây là một ví dụ sử dụng regex đơn giản:
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};
