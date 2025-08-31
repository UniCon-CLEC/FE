"use client";

import { motion } from "motion/react";
import Link from "next/link";

export const Back = (props: { text: string, url: string }) => {
    return (
        <Link href={props.url}>
            <motion.div className="flex gap-1 text-(--subtext) font-bold items-center -translate-x-6 origin-left"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <span>{props.text}</span>
            </motion.div>
        </Link>
    )
}