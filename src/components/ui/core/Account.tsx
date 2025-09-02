"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useMeData } from "@/hooks/useMeData";

export const Account = ({ className }: { className?: string }) => {
    const { data, isLoading, error } = useMeData()

    if (data) {
        return (
            <motion.div className={`grow-1 cursor-pointer flex justify-end ${className ? className : ""}`}
                initial={{ color: "#000000" }}
                whileHover={{ color: "var(--main)" }}
                transition={{ duration: 0.1 }}>
                <div className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <div className="font-bold text-sm">
                    <Link href="/profile">
                        내 프로필
                    </Link>
                </div>
            </motion.div>
        )
    } else {
        return (
            <motion.div className={`grow-1 text-(--subtext) text-right text-sm cursor-pointer ${className ? className : ""}`}
                whileHover={{ color: "var(--main)" }}
                transition={{ duration: 0.1 }}>
                <Link href={"/login"}>
                    로그인/회원가입
                </Link>
            </motion.div>
        )
    }
}