"use client";

import { useAuthStore } from "@/store/useAuthStore"
import { ImgBox } from "../ui/core/ImgBox"

export const ProfileArea = () => {
    const user = useAuthStore((state) => state.user)

    if (user) {
        return (
            <div className="w-screen flex flex-col h-fit mt-22 pb-6 items-center">
                <div className="w-fit">
                    <ImgBox className="aspect-square w-22 h-22"/>
                </div>
                <div className="text-lg w-fit font-bold mt-3">
                    {user.name}
                </div>
                <div className="text-sm text-(--subtext) w-fit mt-1">
                    {user.id}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}