"use client";
import React from "react";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import logoImage from "/src/img/logo-name.svg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../../../core/services/auth.service.js";
import { setToken, setUserLogin } from "../../../core/store/feature/user-slice.js";
import toast from "react-hot-toast";
import Loading from "../../../components/share/loading.js";

function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm();

    const mutation = useMutation({
        mutationFn: (data) => {
            return AuthService.login(data);
        },
        onSuccess: ({ data }) => {
            const { accessToken, user } = data.result;
            dispatch(setUserLogin(user));
            dispatch(setToken(accessToken));
            queryClient.invalidateQueries(["user"]);
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const loginHandler = (values) => {
        mutation.mutate(values);
    };

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
                onSubmit={handleSubmit(loginHandler)}
                className="flex items-center justify-center bg-white w-full lg:w-1/2 px-10 "
            >
                <div>
                    <Image className="w-48" src={logoImage} alt="background-image" />
                    <p className="text-lg mt-3.5">Kết nối với cộng đồng những người yêu thú cưng.</p>

                    {/* Input Field */}
                    <div className="mt-8">
                        <div>
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

                        <Link href="/reset-password">
                            <button className="font-medium text-base text-violet-500 mt-3">Quên mật khẩu?</button>
                        </Link>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-y-4">
                            <button
                                className="active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl flex justify-center text-center text-white bg-violet-500 text-lg font-bold"
                                type="submit"
                            >
                                {mutation.isPending ? <Loading /> : "Đăng nhập"}
                            </button>

                            <button className="flex items-center border-2  border-violet-300 justify-center gap-3 active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl text-violet-500 bg-white text-lg font-bold">
                                <svg width={24} height={24} viewBox="0 0 48 48">
                                    <title>Google Logo</title>
                                    <clipPath id="g">
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                    </clipPath>
                                    <g className="colors" clip-path="url(#g)">
                                        <path fill="#FBBC05" d="M0 37V11l17 13z" />
                                        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                                    </g>
                                </svg>
                                Đăng nhập với Google
                            </button>
                        </div>

                        <Link href="/signup">
                            <div className="mt-8 flex justify-center items-center">
                                <p>Bạn chưa có tài khoản?</p>
                                <button className="text-violet-500 textbase font-medium ml-2">Đăng ký tại đây.</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
