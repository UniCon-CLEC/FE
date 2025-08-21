"use client";

import { CategoryList } from "@/components/layout/Category";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { RequestNotice } from "@/components/layout/RequestNotice";
import { NavSection } from "@/components/ui/core/Section";
import { LargeItemList } from "@/components/ui/items/BaseItem";
import { SliderView } from "@/components/ui/items/SliderView";
import { TrackItem, TrackLargeItem } from "@/components/ui/items/TrackItem";
import { useState } from "react";

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
    
    return (
        <>
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title="인기 트랙" ItemComponent={TrackLargeItem} lectures={[{title:'ㅁㄴㅇㄹ', lecturer:'클렉 스튜디오',description:'test'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
                <CategoryList/>
                <NavSection data={navData[0]} set={setActiveSection} noMargin>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <NavSection data={navData[1]} set={setActiveSection}>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <NavSection data={navData[2]} set={setActiveSection}>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <RequestNotice keyword="트랙"/>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    )
}