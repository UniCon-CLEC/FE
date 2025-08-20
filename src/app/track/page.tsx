"use client";

import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { NavSection } from "@/components/ui/core/NavSection";
import { LargeItemList } from "@/components/ui/items/BaseItem";
import { TrackLargeItem } from "@/components/ui/items/TrackItem";
import { useState } from "react";

const navData = [
    {
        id: "ongoing",
        content: "펀딩 진행 중인 강의"
    },
    {
        id: "survey",
        content: "강의 주제 설문 조사"
    }
]

export default function Track() {
    const [activeSection, setActiveSection] = useState<string>("")
    
    return (
        <>
            <Header/>
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title="인기 트랙" ItemComponent={TrackLargeItem} lectures={[{title:'ㅁㄴㅇㄹ', lecturer:'클렉 스튜디오',description:'test'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
                <NavSection data={navData[0]} set={setActiveSection}>

                </NavSection>
                <NavSection data={navData[1]} set={setActiveSection}>

                </NavSection>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    )
}