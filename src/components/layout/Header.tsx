"use client";

import Image from "next/image"
import { motion } from "motion/react"

import { Account } from "../ui/core/Account"
import { PropsWithChildren, useState } from "react";
import { Category } from "./Category";
import Link from "next/link";

const HeaderItem = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => {
    return (
        <motion.div className="font-bold text-center cursor-pointer grow-1"
            whileHover={{ color: "var(--main)" }}
            transition={{ duration: 0.1 }}
            onClick={onClick}>
            {children}
        </motion.div>
    )
}

export const Header = () => {
    const [isCategoryOpened, setIsCategoryOpened] = useState(false);

    return (
        <>
            <header className="w-screen py-3 fixed top-0 bg-white z-100 shadow-md">
                <div className="w-(--page-width) mx-auto flex items-center">
                    <div className="grow-2">
                        <Link href={"/"}>
                            <Image src={"/logo.png"} alt="c:lec" width={90} height={45} className="cursor-pointer"></Image>
                        </Link>
                    </div>
                    <div className="relative grow-2">
                        <div className="absolute top-1.5 left-2 cursor-pointer">
                            <Image src={"/icons/search.png"} alt="search" width={16} height={16}/>
                        </div>
                        <input className="focus:outline-none bg-gray-100 rounded-full pl-7 pr-2 text-sm h-7 w-[90%] max-w-xs" placeholder="검색어 입력"/>
                    </div>
                    <HeaderItem>
                        <Link href={"/funding"}>펀딩</Link>
                    </HeaderItem>
                    <HeaderItem>
                        <Link href={"/crew"}>크루</Link>
                    </HeaderItem>
                    <HeaderItem>
                        <Link href={"/track"}>트랙</Link>
                    </HeaderItem>
                    <HeaderItem onClick={() => setIsCategoryOpened(!isCategoryOpened)}>
                        카테고리
                    </HeaderItem>
                    <Account className="grow-1"/>
                </div>
            </header>
            <Category isOpened={isCategoryOpened}/>
        </>
    )
}