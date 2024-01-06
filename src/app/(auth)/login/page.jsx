"use client";
import React, { useEffect, useState } from "react";
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
import Loading from "../../../components/share/loading.js";
import { store } from "../../../core/store/index.js";
import toast from "react-hot-toast";

function Login() {
    const router = useRouter();

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm();

    const token = store.getState().user.accessToken;
    useEffect(() => {
        let isMounted = true;

        const redirectToHome = async () => {
            if (token && isMounted) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                router.push("/");
            }
        };

        redirectToHome();

        return () => {
            isMounted = false;
        };
    }, [token, router]);

    const mutation = useMutation({
        mutationFn: (data) => {
            return AuthService.login(data);
        },
        onSuccess: ({ data }) => {
            const { accessToken, user } = data.result;
            dispatch(setUserLogin(user));
            dispatch(setToken(accessToken));
            queryClient.invalidateQueries(["user"]);
            router.refresh();
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
                            <div className="cursor-pointer font-medium text-base text-violet-500 mt-3">
                                Quên mật khẩu?
                            </div>
                        </Link>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-y-4">
                            <button
                                className="active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl flex justify-center text-center text-white bg-violet-500 text-lg font-bold"
                                type="submit"
                            >
                                {mutation.isPending ? <Loading /> : "Đăng nhập"}
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