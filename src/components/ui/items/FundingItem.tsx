"use client";

import Link from "next/link";
import { BaseItem, BaseLargeItem, ItemProps } from "./BaseItem";
import type { FundingCourseData } from "@/data/course"

export const FundingItem = ({ course }: ItemProps) => {
    const data = course as FundingCourseData

    return (
        <Link href={"/funding/detail/0"}>
            <div className="h-full relative cursor-pointer flex flex-col justify-between">
                <div>
                    <BaseItem course={course}/>
                </div>
                
                <div>
                    <div className="flex justify-between mt-3">
                        <span className="text-xs text-(--subtext) pl-1">목표 {data.fundingTargetAmount.toLocaleString()}원</span>
                        <span className="text-xs text-(--main) font-bold pr-1">{Math.round(data.achievementRate)}%</span>
                    </div>
                    <progress value={data.achievementRate} max={100} className="block mt-1 w-full"/>
                </div>
            </div>
        </Link>
    )
}

export const FundingSmallItem = ({ course }: ItemProps) => {
    const data = course as FundingCourseData

    return (
        <div className="h-fit relative cursor-pointer">
            <BaseItem course={course} noScrap/>
            <div className="mt-1 text-xs text-(--main) font-bold pr-1 text-right">
                {data.achievementRate}% 진행됨
            </div>
            <progress value={Math.round(data.achievementRate)} max={100} className="block w-full"/>
        </div>
    )
}

export const FundingLargeItem = ({ course }: ItemProps) => {
    const data = course as FundingCourseData

    return (<div>
        <BaseLargeItem course={course}/>
        <div className="mt-3 ml-2">
            <span className="text-(--subtext) mr-3">목표 {data.fundingTargetAmount.toLocaleString()}원</span>
            <span className="font-bold text-(--main)">{Math.round(data.achievementRate)}% 달성</span>
        </div>
    </div>)
}