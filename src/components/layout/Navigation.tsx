"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

type NavigationProps = { 
    navTargets: { id: string, title: string }[],
    activeTargetId: string
}
export const Navigation = ({ navTargets, activeTargetId } : NavigationProps) => {

    const makeNavItems = () => navTargets.map(({ id, title }, index) => {
        const handleClick = () => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
        }

        const flag = activeTargetId === id
        return (
            <li key={index} className="pb-4 relative">
                <motion.div className={`cursor-pointer ${flag ? "font-bold" : ""}`}
                    whileHover={{ color: "var(--main)" }}
                    transition={{ duration: 0.1 }} onClick={handleClick}>
                    {title}
                </motion.div>
                { flag && <Image src={"/icons/selected.png"} height={10} width={10} alt="" className="absolute -right-6 top-1.5"/> }
            </li>
        )
    })

    return (
        <nav className="fixed left-[calc((var(--page-width)/2)+52vw)] top-35">
            <ol className="list-none">
                {makeNavItems()}
            </ol>
        </nav>
    )
}