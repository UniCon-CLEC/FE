"use client";

import { Navigation } from "@/components/layout/Navigation";
import { NavSection } from "@/components/ui/core/Section";
import { ItemGridView, LargeItemList } from "@/components/ui/items/BaseItem";
import { FundingItem, FundingLargeItem } from "@/components/ui/items/FundingItem";
import { useState } from "react";

const navData = [
    {
        id: "ongoing",
        title: "진행 중인 펀딩"
    },
    {
        id: "survey",
        title: "강의 주제 설문 조사"
    }
]

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})

export default function Funding() {
    const [activeSection, setActiveSection] = useState<string>("")

    return (
        <>
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title="인기 펀딩" ItemComponent={FundingLargeItem} lectures={[{title:'펀딩 세계에서 살아남기', lecturer:'클렉 스튜디오',description:'test'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
                <NavSection data={navData[0]} set={setActiveSection}>
                    <ItemGridView lectures={sampleLectures} ItemComponent={FundingItem}/>
                </NavSection>
                <NavSection data={navData[1]} set={setActiveSection}>

                </NavSection>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    );
}