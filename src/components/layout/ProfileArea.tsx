"use client";

import { useContext } from "react";
import { ImgBox } from "../ui/core/ImgBox"
import { useMeData } from "@/hooks/useMeData";
import { ProfileContext } from "@/app/profile/[[...id]]/ProfileContext";

export const ProfileArea = () => {
    const id = useContext(ProfileContext)

    const { data, isLoading, error } = useMeData()

    if (!data) return <></>

    if (!id) {
        return (
            <div className="w-screen flex flex-col h-fit mt-30 pb-12 mb-6 items-center shadow-md">
                <div className="font-bold text-2xl mb-6">
                    {data.name}님, 안녕하세요!
                </div>
                <div className="w-fit">
                    <ImgBox className="aspect-square w-22 h-22" src={data.profileImageUrl ?? undefined}/>
                </div>
                <div className="text-lg w-fit font-bold mt-3">
                    {data.name}
                </div>
                <div className="text-sm text-(--subtext) w-fit mt-1">
                    {data.email}
                </div>
                <div className="text-sm text-(--subtext) mt-10">
                    나의 관심 분야
                </div>
                <div className="flex justify-around font-bold mt-2 w-[60vw]">
                    {
                        data.tags.map((tag, index) => {
                            return (
                                <div key={index} className="">
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-screen flex flex-col h-fit mt-22 pb-6 mb-10 items-center shadow-md">
                <div className="w-fit">
                    <ImgBox className="aspect-square w-22 h-22"/>
                </div>
                <div className="text-lg w-fit font-bold mt-3">
                    {data.name}
                </div>
                <div className="text-sm text-(--subtext) w-fit mt-1">
                    {data.email}
                </div>
            </div>
        )
    }
}