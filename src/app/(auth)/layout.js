"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import "../globals.css";

export default function AuthLayout({ children }) {
    return (
        <div>
            <div>
                {children}
                <Toaster />
            </div>
            <ProgressBar height="4px" color="#9B66FD" options={{ showSpinner: false }} shallowRouting />
        </div>
    );
}
