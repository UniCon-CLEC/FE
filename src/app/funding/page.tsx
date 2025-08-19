"use client";

import { Header } from "@/components/layout/Header";
import { LargeItemList } from "@/components/ui/items/BaseItem";
import { FundingLargeItem } from "@/components/ui/items/FundingItem";

export default function Funding() {
    return (
        <>
            <Header/>
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title="인기 펀딩" ItemComponent={FundingLargeItem} lectures={[{title:'펀딩 세계에서 살아남기', lecturer:'클렉 스튜디오',description:'test'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
            </main>
        </>
    );
}