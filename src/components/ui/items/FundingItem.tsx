"use client";

import { BaseItem, BaseLargeItem, LargeItemProps } from "./BaseItem";

export const FundingItem = () => {
    // fetch

    return (
        <div className="w-40 h-fit relative">
            <BaseItem lecturer="강사명" title="강의제목"/>
            <div className="flex justify-between mt-3">
                <span className="text-xs text-(--subtext) pl-1">목표 1,000,000원</span>
                <span className="text-xs text-(--main) font-bold pr-1">12%</span>
            </div>
            <progress value={12} max={100} className="block mt-1"/>
        </div>
    )
}

export const FundingLargeItem = ({ lecture }: LargeItemProps) => {
    return (<div>
        <BaseLargeItem lecture={lecture}/>
        <div className="mt-3 ml-2">
            <span className="text-(--subtext) mr-3">목표 1,000,000원</span>
            <span className="font-bold text-(--main)">12% 달성</span>
        </div>
    </div>)
}