"use client";

import { useState } from "react";
import { ImgBox } from "../core/ImgBox";
import Image from "next/image";
import { motion, useAnimate } from "motion/react";

export type LectureInfo = { title: string, lecturer: string, description?: string }
export type ExtendedLectureInfo = LectureInfo & Record<string, any>

export const BaseItem = ({ lecturer, title, noScrap }: LectureInfo & { noScrap?: boolean }) => {
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
            { !noScrap &&
            <Image src={`/icons/heart_${isScraped ? "filled" : "empty"}.png`} alt="" width={22} height={22} className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setIsScraped(!isScraped)}></Image>
            }
        </>
    )
}

export const ItemGridView = ({ lectures, ItemComponent, small }: { lectures: ExtendedLectureInfo[], ItemComponent: React.ComponentType<ItemProps>, small: boolean }) => {
    const makeItems = () => {
        return lectures.map((info, index) => {
            return (
                <motion.div key={index} className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}>
                    <ItemComponent lecture={info}/>
                </motion.div>
            )
        })
    }
    
    return (
        <div className={"grid " + (small ? "gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]" : "px-2 gap-x-10 gap-y-15 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]")}>
            {makeItems()}
        </div>
    )
}

export type ItemProps = { lecture: ExtendedLectureInfo, className?: string, ref?: React.Ref<any> }
export const BaseLargeItem = ({ lecture } : ItemProps) => {
    return (
        <>
            <div className="flex w-full">
                <div className="w-[60%]">
                    <ImgBox className="shadow-md aspect-2/1"/>
                    <div className="mt-5 ml-2">
                        <div className="font-bold text-xl">{lecture.title}</div>
                        <div className="text-(--subtext) text-lg mt-1">{lecture.lecturer}</div>
                    </div>
                </div>
                <p className="text-(--subtext) mt-2 ml-8 whitespace-pre w-[40%]">
                    {lecture.description}
                </p>
            </div>
        </>
    )
}

const transitionDuration = 0.25
export const LargeItemList = ({ title, lectures, ItemComponent }: { title: string, lectures: ExtendedLectureInfo[], ItemComponent: React.ComponentType<ItemProps> }) => {
    const [index, setIndex] = useState(0);
    const [scope, animate] = useAnimate()

    const next = () => {
        animate(scope.current, {
            opacity: 0,
            y: 20
        }, {
            duration: transitionDuration,
            ease: "circIn"
        }).then(() => {
            setIndex((prevIndex) => (prevIndex + 1) % lectures.length)
            return animate(scope.current, {
                opacity: 1,
                y: 0
            }, {
                duration: transitionDuration,
                ease: "circOut"
            })
        })
    }

    const prev = () => {
        animate(scope.current, {
            opacity: 0,
            y: 20
        }, {
            duration: transitionDuration,
            ease: "circIn"
        }).then(() => {
            setIndex((prevIndex) => (prevIndex - 1 + lectures.length) % lectures.length)
            return animate(scope.current, {
                opacity: 1,
                y: 0
            }, {
                duration: transitionDuration,
                ease: "circOut"
            })
        })
    }

    return (
        <motion.div className="w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}>
            <div className="flex items-center mt-25 mb-3">
                <span className="rounded-full bg-(--main) w-3 h-3 ml-2 mr-3"/>
                <h2 className="font-bold text-2xl">{title}</h2>
            </div>
            <div className="relative" ref={scope}>
                <div className="cursor-pointer">
                    <ItemComponent lecture={lectures[index]}/>
                </div>
                <div className="absolute bottom-3 right-[40%] mr-3 text-sm flex items-center">
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
        </motion.div>
    )
}