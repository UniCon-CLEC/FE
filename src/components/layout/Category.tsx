"use client";

import categories from "@/data/categories.json"
import { JSX, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image";

const SubCategory = ({ parent }: { parent: any }) => {

    const makeChildren = () => {
        const result: JSX.Element[] = []
        parent.children.forEach((child: any) => {
            result.push(
                <motion.div key={child.id} className="text-sm mt-1 cursor-pointer"
                    whileHover={{ color: "var(--main)" }}
                    transition={{ duration: 0.1 }}>
                    {child.name}
                </motion.div>
            )
        })
        return result
    }

    return (
        <div className="flex h-fit">
            <div className="mr-3">
                <Image src={`/categories/${parent.id}.png`} width={28} height={28} alt=""></Image>
            </div>   
            <div>
                <motion.div className="text-lg font-bold mb-1 cursor-pointer"
                    whileHover={{ color: "var(--main)" }}
                    transition={{ duration: 0.1 }}>
                    {parent.name}
                </motion.div>
                <div>
                    {makeChildren()}
                </div>
            </div>
        </div>
    )
}

export const Category = ({ isOpened }: { isOpened: boolean }) => {
    const makeCategories = () => {
        const result: JSX.Element[] = []
        categories.forEach((category) => {
            result.push(
                <SubCategory key={category.id} parent={category}/>
            )
        })
        return result
    }

    return (
        <AnimatePresence>
            { isOpened && 
            <motion.div key={"category"} className="w-screen absolute top-15 z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}>
                <div className="grid grid-cols-5 rounded-lg bg-(--category-bg) gap-y-10 w-[calc(var(--page-width)+10vw)] mx-auto px-6 py-8 justify-between">
                    {makeCategories()}
                </div>
            </motion.div>
            }
        </AnimatePresence>
    )
}