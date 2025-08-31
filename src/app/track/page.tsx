"use client";

import { CategoryList } from "@/components/layout/Category";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { RequestNotice } from "@/components/layout/RequestNotice";
import { NavSection } from "@/components/ui/core/Section";
import { LargeItemList } from "@/components/ui/items/BaseItem";
import { SliderView } from "@/components/ui/items/SliderView";
import { TrackItem, TrackLargeItem } from "@/components/ui/items/TrackItem";
import { request } from "@/lib/request";
import { useEffect, useState } from "react";

const navData = [
    {
        id: "new",
        title: "신규 업데이트 트랙"
    }, {
        id: "steady",
        title: "스테디셀러 트랙"
    }, {
        id: "peer",
        title: "지금 내 또래는?"
    }
]

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})


export default function Track() {
    const [activeSection, setActiveSection] = useState<string>("")
    const [lectures, setLecutres] = useState<any>(null)

    useEffect(() => {
        const get = async () => {
            const data = await (await request("/courses/track")).json()
            console.log(data)
            setLecutres(data.map((data: any) => ({ title: data.title, lecturer: data.instructor.name })))
        }
        get()
    }, [])
    
    return (
        <>
            <main className="w-(--page-width) mx-auto">
                { lectures && 
                    <>
                        <LargeItemList title="인기 트랙" ItemComponent={TrackLargeItem} lectures={lectures}></LargeItemList>
                        <CategoryList/>
                        <NavSection data={navData[0]} set={setActiveSection} noMargin>
                            <SliderView lectures={lectures} ItemComponent={TrackItem}/>
                        </NavSection>
                        <NavSection data={navData[1]} set={setActiveSection}>
                            <SliderView lectures={lectures} ItemComponent={TrackItem}/>
                        </NavSection>
                        <NavSection data={navData[2]} set={setActiveSection}>
                            <SliderView lectures={lectures} ItemComponent={TrackItem}/>
                        </NavSection>
                    </>
                }
                <RequestNotice keyword="트랙"/>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    )
}