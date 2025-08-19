"use client";

import { useAuthStore } from "@/store/useAuthStore";

export const Account = ({ className }: { className?: string }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    if (isLoggedIn) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className={`text-(--subtext) text-right text-sm cursor-pointer hover:underline ${className ? className : ""}`}>
                로그인/회원가입
            </div>
        )
    }
}