"use client";

import { CategoryInfo } from "@/data/categories";
import categories from "@/data/categories.json"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image";
import Link from "next/link";

const SubCategoryToggle = ({ parent }: { parent: CategoryInfo }) => {
    const makeChildren = () => {
        return parent.children?.map((child: any) => {
            return (
                <motion.div key={child.id} className="text-sm mt-1 cursor-pointer"
                    whileHover={{ color: "var(--main)" }}
                    transition={{ duration: 0.1 }}>
                    <Link href={`/track/${child.id}`}>
                        {child.name}
                    </Link>
                </motion.div>
            )
        })
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
                    <Link href={`/track/${parent.id}`}>
                        {parent.name}
                    </Link>
                </motion.div>
                <div>
                    {makeChildren()}
                </div>
            </div>
        </div>
    )
}

export const CategoryToggle = ({ isOpened }: { isOpened: boolean }) => {
    const makeCategories = () => {
        return categories.map((category) => {
            return (
                <SubCategoryToggle key={category.id} parent={category}/>
            )
        })
    }

    return (
        <AnimatePresence>
            { isOpened && 
            <motion.div key={"category"} className="w-screen absolute fixed top-14 z-100"
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

export const CategoryList = () => {
    const makeItems = () => {
        return categories.map(({ id, name }, index) => {
            return (
                <motion.div key={id} className="text-sm font-bold rounded-sm w-41 flex items-center bg-(--category-bg) py-2 px-3 gap-x-3 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.1 }}>
                    <div>
                        <Image src={`/categories/${id}.png`} width={24} height={24} alt=""/>
                    </div>
                    <div>
                        <Link href={`/track/${id}`}>
                            {name}
                        </Link>
                    </div>
                </motion.div>
            )
        })
    }

    return (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(164px,1fr))] gap-x-3 gap-y-6 mt-20 mb-10">
            {makeItems()}
        </div>
    )
}