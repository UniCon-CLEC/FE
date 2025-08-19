"use client";

import { BaseItem } from "./BaseItem";

export const TrackItem = () => {
    // fetch

    return (
        <div className="w-40 h-fit relative">
            <BaseItem lecturer="강사명" title="강의제목"/>
            <div className="text-xs text-(--subtext) pl-1 mt-3">36시간 분량</div>
            <div className="flex justify-between">
                <span className="text-sm pl-1 font-bold">중급</span>
                <span className="text-sm text-yellow-500 font-bold pr-1">평점 4.9/5.0</span>
            </div>
        </div>
    )
}