"use client";

import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { RequestNotice } from "@/components/layout/RequestNotice";
import { NavSection } from "@/components/ui/core/Section";
import { LargeItemList } from "@/components/ui/items/BaseItem";
import { SliderView } from "@/components/ui/items/SliderView";
import { TrackItem, TrackLargeItem } from "@/components/ui/items/TrackItem";
import { useCourseData } from "@/hooks/useCourseData";
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

export default function Crew() {
    const [activeSection, setActiveSection] = useState<string>("")

    const { data, isLoading, error } = useCourseData('crew')

    return (
        <>
            <main className="w-(--page-width) mx-auto">
                { data && 
                    <>
                        <LargeItemList title="인기 크루" ItemComponent={TrackLargeItem} courses={data}></LargeItemList>
                        <NavSection data={navData[0]} set={setActiveSection}>
                            <SliderView courses={data} ItemComponent={TrackItem}/>
                        </NavSection>
                        <NavSection data={navData[1]} set={setActiveSection}>
                            <SliderView courses={data} ItemComponent={TrackItem}/>
                        </NavSection>
                        <NavSection data={navData[2]} set={setActiveSection}>
                            <SliderView courses={data} ItemComponent={TrackItem}/>
                        </NavSection>
                    </>
                }
                <RequestNotice keyword="크루"/>
            </main>
            <Navigation navTargets={navData} activeTargetId={activeSection}/>
        </>
    );
}