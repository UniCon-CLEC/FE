"use client";

import { use, useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ItemGridView } from "@/components/ui/items/BaseItem";
import { TrackSmallItem } from "@/components/ui/items/TrackItem";
import { FundingSmallItem } from "@/components/ui/items/FundingItem";
import { CrewSmallItem } from "@/components/ui/items/CrewItem";
import Image from "next/image";

const NavItem = ({ text, selected, id }: { text: string, selected: boolean, id: string | undefined }) => {
    return (
        <motion.li className={`text-lg cursor-pointer mb-3 ${selected ? "font-bold" : "text-(--subtext)"}`}
            whileHover={{ color: "var(--main)" }}
            transition={{ duration: 0.1 }}>
            <Link href={id ? `/profile/${id}` : "/profile"}>
                {text}
            </Link>
        </motion.li>
    )
}

const navData = [
    {
        text: "프로필",
        id: undefined
    },
    {
        text: "트랙",
        id: "track",
        component: TrackSmallItem
    },
    {
        text: "크루",
        id: "crew",
        component: CrewSmallItem
    },
    {  
        text: "펀딩",
        id: "funding",
        component: FundingSmallItem
    }
]

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})

export default function Profile({ params }: { params: Promise<{ id?: string[] }> }) {
    const _params = use(params)
    const id = _params.id?.at(0)
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setData(navData.find((data) => id === data.id) ?? null)
    }, [])
    
    if (data) {
        return (
            <main className="w-(--profile-width) mx-auto relative">
                <div className="absolute top-15 right-[calc(100%+60px)] w-fit whitespace-nowrap">
                    <ol>
                        {navData.map((item, index) => {
                            return (
                                <NavItem text={item.text} selected={id == item.id} id={item.id} key={index}/>
                            )
                        })}
                    </ol>
                </div>
                <div className="mb-20">
                    <h1 className="text-2xl font-bold mb-6">
                        {data.text}
                    </h1>
                    { id &&
                        <>
                            { id !== "track" &&
                                <div className="absolute top-1 right-1 flex items-center cursor-pointer">
                                    <div className="mr-1">
                                        <Image src={"/icons/eye.png"} width={14} height={14} alt=""/>
                                    </div>
                                    <div className="text-xs">
                                        종료된 {data.text} 보기
                                    </div>
                                </div>
                            }
                            <ItemGridView lectures={sampleLectures} ItemComponent={data.component} small/>
                        </>
                    }
                </div>
            </main>
        )
    } else {
        return <></>
    }   
}