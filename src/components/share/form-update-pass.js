"use client";

import Link from "next/link";
import Image from "next/image";
import bgImage from "/src/img/bg-image.png";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthService from "../../core/services/auth.service.js";
import { useRouter } from "next/navigation.js";

function FormUpdatePassword(props) {
    const { email } = props;
    const router = useRouter();

    const mutaion = useMutation({
        mutationFn: async (data) => {
            await AuthService.updatePassword(data);
        },
        onSuccess: () => {
            toast.success("Đã đặt lại mật khẩu");
            router.push("/login");
        },
    });

    const handleUpdatePass = (values) => {
        if (isValidData(values)) {
            const body = { email: email, password: values.password };
            mutaion.mutate(body);
        }
    };

    const { register, handleSubmit } = useForm();

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
                onSubmit={handleSubmit(handleUpdatePass)}
            >
                <div>
                    <h1 className="text-4xl font-bold"> Đặt lại mật khẩu</h1>
                    <p className="text-lg mt-3.5">Xác nhận email thành công. Hãy đặt lại mật khẩu.</p>

                    {/* Input Field */}
                    <div className="mt-8">
                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Mật khẩu mới"
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                className="w-full border-2 outline-none border-gray-100 rounded-md p-2.5"
                                placeholder="Xác nhận mật khẩu mới"
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword")}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button
                                className="active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl flex justify-center text-white bg-violet-500 text-lg font-semibold"
                                type="submit"
                            >
                                Đặt lại mật khẩu
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

export default FormUpdatePassword;

const isValidData = (data) => {
    const errors = [];

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

    errors.forEach((err) => {
        toast.error(err);
    });

    return errors.length === 0;
};
