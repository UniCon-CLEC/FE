"use client";

import Image from "next/image";
import { JSX, PropsWithChildren, useEffect, useRef } from "react"
import { motion } from "motion/react";
import Link from "next/link";
import { CategoryInfo } from "@/data/categories";

const SECTION_MARGIN_TOP = 20

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <h1 className="text-2xl font-bold pl-2 mb-5">{title}</h1>
    )
}

const SubCategoryItem = ({ id, name, selected }: { id: number, name: string, selected: boolean }) => {
    return (
        <motion.li className={`mb-3 ${selected ? "font-bold" : "text-(--subtext)"}`}
            whileHover={{ color: "var(--main)" }}
            transition={{ duration: 0.1 }}>
            <Link href={`/track/${id}?list`}>
                {name}
            </Link>
        </motion.li>
    )
}
export const CategorySection = ({ parent, current, children, scroll }: PropsWithChildren<{ parent: CategoryInfo | null, current: CategoryInfo, scroll?: boolean }>) => {
    const temp = (parent ?? current)
    const listRef = useRef<HTMLDivElement>(null)

    if (scroll) {
        useEffect(() => {
            listRef.current?.scrollIntoView()
        }, [listRef.current])
    }

    const makeSubCategory = () => {
        const result = []

        result.push(
            <SubCategoryItem key={temp.id} id={temp.id} name="전체" selected={current.id === temp.id}/>
        )

        temp.children?.forEach((info) => {
            result.push(
                <SubCategoryItem key={info.id} id={info.id} name={info.name} selected={current.id === info.id}/>
            )
        })
        return result
    }

    return (
        <section className={`relative scroll-mt-20 mt-${SECTION_MARGIN_TOP}`} ref={listRef}>
            <div className="flex items-center">
                <div className="pr-2 mb-5">
                    <Image src={`/categories/${temp.id}.png`} width={28} height={28} alt=""/>
                </div>
                <SectionTitle title={temp.name}/>
            </div>
            <div className="absolute top-14 right-[calc(100%+40px)] w-fit">
                <ol className="whitespace-nowrap">
                    {makeSubCategory()}
                </ol>
            </div>
            {children}
        </section>
    )
}

type NavSectionProps = PropsWithChildren<{
    data: { id: string, title: string },
    set: (id: string) => void,
    noMargin?: boolean
}>
export const NavSection = ({ data, children, set, noMargin }: NavSectionProps) => {
    const observerRef = useRef<IntersectionObserver>(null)
    const targetRef = useRef<HTMLElement>(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    set(data.id)
                }
            })
        }, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        })

        if (targetRef.current) observerRef.current.observe(targetRef.current)

        return () => {
            observerRef.current?.disconnect()
        }
    }, [])

    return (
        <section id={data.id} ref={targetRef} className={`${noMargin ? "" : `mt-${SECTION_MARGIN_TOP}`} scroll-mt-20`}>
            <SectionTitle title={data.title}/>
            {children}
        </section>
    )
}