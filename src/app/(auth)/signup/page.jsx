"use client";
import React from "react";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../../core/services/auth.service.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorField from "../../../components/share/error-field.js";
import Loading from "../../../components/share/loading.js";
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Vui lòng nhập email hợp lệ").max(255).required("Vui lòng nhập email"),
    password: Yup.string().min(8, "Mật khẩu phải có it nhất 8 ký tự").required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp")
        .required("Vui lòng nhập xác nhận mật khẩu"),
    firstName: Yup.string().max(255).required("Vui lòng nhập Tên"),
    lastName: Yup.string().max(255).required("Vui lòng nhập Họ"),
    isAcceptCondition: Yup.boolean()
        .oneOf([true], "Vui lòng chấp nhận điều khoản")
        .required("Vui lòng chấp nhận điều khoản"),
});

function Signup() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data) => {
            return AuthService.register(data);
        },
        onSuccess: () => {
            toast.success("Đăng ký thành công");
            reset();
            router.refresh();
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleRegister = (values) => {
        // if (isValidUserData(values)) {
        mutation.mutate({
            ...values,
            avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/default%20user%20Avatar%2F1702319592767.png?alt=media&token=64defb97-1690-4f4c-995c-16dcba72ffaf",
        });
        // }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(SignupSchema) });

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
                                <ErrorField sub={errors.lastName?.message} />
                            </div>
                            <div>
                                <input
                                    className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                    placeholder="Tên"
                                    id="firstName"
                                    {...register("firstName")}
                                />
                                <ErrorField sub={errors.firstName?.message} />
                            </div>
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Email"
                                id="email"
                                {...register("email")}
                            />
                            <ErrorField sub={errors.email?.message} />
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Mật khẩu"
                                type="password"
                                id="password"
                                {...register("password")}
                            />
                            <ErrorField sub={errors.password?.message} />
                        </div>

                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Nhập lại mật khẩu"
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword")}
                            />
                            <ErrorField sub={errors.confirmPassword?.message} />
                        </div>

                        <div className="mt-4">
                            <input id="lisenced" type="checkbox" {...register("isAcceptCondition")} />
                            <label className="ml-2  text-base">Tôi đồng ý với các điều khoản và điều kiện</label>
                            <ErrorField sub={errors.isAcceptCondition?.message} />
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
