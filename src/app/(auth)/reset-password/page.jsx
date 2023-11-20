"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import FormResetPass from "../../../components/share/form-reset-pass.js";
import FormUpdatePass from "../../../components/share/form-update-pass.js";

function page() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.exp >= new Date().getTime / 1000) {
            delete decodedToken.iat;
            delete decodedToken.exp;
        } else {
            toast.error("Thao tác thất bại");
        }

        return <FormUpdatePass email={decodedToken.email} />;
    }

    return <FormResetPass />;
}

export default page;
