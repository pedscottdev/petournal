import Link from "next/link";
import React from "react";

const EmptyFeed = () => {
    return (
        <div className="flex justify-center bg-white rounded-xl shadow-sm border-1 borrder-gray-200 mt-6">
            <div className="flex flex-col items-center justify-center p-6 w-full">
                <h2 className="text-2xl px-10 font-semibold text-gray-800">
                    🌟 Chào mừng các bạn đến với cộng đồng Thú Cưng Petournal! 🐾
                </h2>
                <p className="text-lg font-medium text-gray-600 mt-8">
                    Hãy thêm một{" "}
                    <Link href="/pets" className="text-violet-500">
                        thú cưng
                    </Link>{" "}
                    và bắt đầu xây dựng hành trình viết lên những nhật ký cho thú cưng của bạn.
                </p>
            </div>
        </div>
    );
};

export default EmptyFeed;
