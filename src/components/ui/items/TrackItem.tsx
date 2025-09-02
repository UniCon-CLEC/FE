"use client";

import Link from "next/link";
import { BaseItem, BaseLargeItem, ItemProps } from "./BaseItem";

export const TrackItem = ({ course, className, ref }: ItemProps) => {
    // fetch

    return (
        <Link href={"/track/detail/0"}>
            <div className={`h-fit relative ${className}`} ref={ref}>
                <BaseItem course={course}/>
                <div className="text-xs text-(--subtext) pl-1 mt-3">36시간 분량</div>
                <div className="flex justify-between mt-1">
                    <span className="text-sm pl-1 font-bold">중급</span>
                    <span className="text-sm text-yellow-500 font-bold pr-1">평점 {course.averageRating}/5.0</span>
                </div>
            </div>
        </Link>
    )
}

export const TrackSmallItem = ({ course, className, ref }: ItemProps) => {
    // fetch

    return (
        <div className={`h-fit relative ${className}`} ref={ref}>
            <BaseItem course={course} noScrap/>
        </div>
    )
}

export const TrackLargeItem = ({ course }: ItemProps) => {
    return (<div>
        <BaseLargeItem course={course}/>
        <div className="ml-2 mt-2 font-bold text-yellow-500">
            평점 {course.averageRating}/5.0
        </div>
    </div>)
}