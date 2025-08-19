"use client";

import { JSX, useState } from "react";
import { ImgBox } from "../core/ImgBox";
import Image from "next/image";

type LectureInfo = { title: string, lecturer: string, description?: string }

export const BaseItem = ({ lecturer, title }: LectureInfo) => {
    const [isScraped, setIsScraped] = useState(false)

    // fetch

    return (
        <>
            <ImgBox className="aspect-square"/>
            <div className="text-(--subtext) text-xs text-center mt-3">
                {lecturer}
            </div>
            <div className="text-sm text-center font-bold mt-1">
                {title}
            </div>
            <Image src={`/icons/heart_${isScraped ? "filled" : "empty"}.png`} alt="" width={18} height={18} className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setIsScraped(!isScraped)}></Image>
        </>
    )
}

export type LargeItemProps = { lecture: LectureInfo }
export const BaseLargeItem = ({ lecture } : LargeItemProps) => {
    return (
        <>
            <ImgBox className="shadow-md aspect-2/1"/>
            <div className="mt-5 ml-2">
                <div className="font-bold text-xl">{lecture.title}</div>
                <div className="text-(--subtext) text-lg mt-1">{lecture.lecturer}</div>
                <p className="text-(--subtext) mt-2">
                    {lecture.description}
                </p>
            </div>
        </>
    )
}

export const LargeItemList = ({ title, lectures, ItemComponent }: { title: string, lectures: LectureInfo[], ItemComponent: React.ComponentType<LargeItemProps> }) => {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prevIndex) => (prevIndex + 1) % lectures.length);
    }

    const prev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + lectures.length) % lectures.length);
    }

    return (
        <div className="ml-10">
            <div className="flex items-center mt-25 mb-3">
                <span className="rounded-full bg-(--main) w-3 h-3 ml-2 mr-3"/>
                <h2 className="font-bold text-2xl">{title}</h2>
            </div>
            <div className="relative">
                <div className="w-[60%]">
                    <ItemComponent lecture={lectures[index]}/>
                </div>
                <div className="absolute bottom-1 right-[40%] text-sm flex items-center">
                    <div>
                        <Image src="/icons/left.png" onClick={prev} alt="left" width={14} height={14} className="cursor-pointer"/>
                    </div>
                    <div className="w-11 text-center">
                        <span className="text-(--main) font-bold px-1">
                            {index + 1}
                        </span>
                        <span className="pr-1">
                            / {lectures.length}
                        </span>
                    </div>
                    <div>
                        <Image src="/icons/right.png" alt="right" onClick={next} width={14} height={14} className="cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}