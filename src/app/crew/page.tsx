"use client";

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
        id: "deadline",
        title: "마감 임박 크루"
    }, {
        id: "join",
        title: "바로 참여 가능한 크루"
    }, {
        id: "plan",
        title: "오픈 예정 크루"
    }
]

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})

export default function Crew() {
    const [activeSection, setActiveSection] = useState<string>("")

    return (
        <>
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title="인기 크루" ItemComponent={TrackLargeItem} lectures={[{title:'예시 제목', lecturer:'클렉 스튜디오',description:'원하는 어떤거 그리고 다른것에 대해 배웁니다.\n이론 수업부터 실전 프로젝트까지!'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
                <NavSection data={navData[0]} set={setActiveSection}>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <NavSection data={navData[1]} set={setActiveSection}>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <NavSection data={navData[2]} set={setActiveSection}>
                    <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </NavSection>
                <RequestNotice keyword="크루"/>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    );
}