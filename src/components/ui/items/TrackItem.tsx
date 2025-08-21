"use client";

import { BaseItem, BaseLargeItem, ItemProps } from "./BaseItem";

export const TrackItem = ({ className, ref }: ItemProps) => {
    // fetch

    return (
        <div className={`h-fit relative ${className}`} ref={ref}>
            <BaseItem lecturer="강사명" title="강의제목"/>
            <div className="text-xs text-(--subtext) pl-1 mt-3">36시간 분량</div>
            <div className="flex justify-between mt-1">
                <span className="text-sm pl-1 font-bold">중급</span>
                <span className="text-sm text-yellow-500 font-bold pr-1">평점 4.9/5.0</span>
            </div>
        </div>
    )
}

export const TrackSmallItem = ({ className, ref }: ItemProps) => {
    // fetch

    return (
        <div className={`h-fit relative ${className}`} ref={ref}>
            <BaseItem lecturer="강사명" title="강의제목" noScrap/>
        </div>
    )
}

export const TrackLargeItem = ({ lecture }: ItemProps) => {
    return (<div>
        <BaseLargeItem lecture={lecture}/>
        <div className="ml-2 mt-2 font-bold text-yellow-500">
            평점 4.9/5.0
        </div>
    </div>)
}