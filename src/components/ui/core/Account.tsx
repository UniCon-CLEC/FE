"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export const Account = ({ className }: { className?: string }) => {
    const user = useAuthStore((state) => state.user)

    if (user) {
        return (
            <motion.div className={`grow-1 cursor-pointer flex justify-end ${className ? className : ""}`}
                whileHover={{ color: "var(--main)" }}
                transition={{ duration: 0.1 }}>
                <div className="mr-1">
                    <Image src={"/icons/account.png"} width={20} height={20} alt=""/>
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