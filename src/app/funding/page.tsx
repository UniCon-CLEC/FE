"use client";

import { Navigation } from "@/components/layout/Navigation";
import { NavSection } from "@/components/ui/core/Section";
import { ItemGridView, LargeItemList } from "@/components/ui/items/BaseItem";
import { FundingItem, FundingLargeItem } from "@/components/ui/items/FundingItem";
import { Survey } from "@/components/layout/Survey";
import { useCourseData } from "@/hooks/useCourseData";
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

export default function Funding() {
    const [activeSection, setActiveSection] = useState<string>("")

    const { data, isLoading, error } = useCourseData('funding')

    return (
        <>
            <main className="w-(--page-width) mx-auto">
                { data && 
                    <>
                        <LargeItemList title="인기 펀딩" ItemComponent={FundingLargeItem} courses={data}></LargeItemList>
                        <NavSection data={navData[0]} set={setActiveSection}>
                            <ItemGridView courses={data} ItemComponent={FundingItem}/>
                        </NavSection>
                        <NavSection data={navData[1]} set={setActiveSection}>
                            <Survey type="funding" />
                        </NavSection>
                    </>
                }
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    );
}