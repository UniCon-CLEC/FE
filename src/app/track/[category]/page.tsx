"use client";

import { CategoryList } from "@/components/layout/Category";
import { Header } from "@/components/layout/Header";
import { RequestNotice } from "@/components/layout/RequestNotice";
import { ItemGridView, LargeItemList } from "@/components/ui/items/BaseItem";
import { TrackItem, TrackLargeItem } from "@/components/ui/items/TrackItem";
import { use, useEffect, useState } from "react";

import categories from "@/data/categories.json"
import { CategorySection } from "@/components/ui/core/Section";
import { CategoryInfo, flatCategories } from "@/data/categories";
import { useSearchParams } from "next/navigation";

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})

const genCompareFunc = (cid: number) => ({ id }: CategoryInfo) => id === cid
export default function Track({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params)
    const searchParams = useSearchParams()

    const [current, setCurrent] = useState<CategoryInfo | null>(null)
    const [parent, setParent] = useState<CategoryInfo | null>(null)
    
    useEffect(() => {
        const categoryId = parseInt(category)
        
        const compareFunc = genCompareFunc(categoryId)
        const data = categories.find(compareFunc) ?? flatCategories(categories).find(compareFunc)
        if (data) {
            setCurrent(data)
            if (data.parentId) {
                setParent(categories.find(genCompareFunc(data.parentId)) ?? null)
            }
        }
    }, [])

    if (current) {
        return (
            <main className="w-(--page-width) mx-auto">
                <LargeItemList title={`${(parent ?? current).name} 인기 트랙`} ItemComponent={TrackLargeItem} lectures={[{title:'ㅁㄴㅇㄹ', lecturer:'클렉 스튜디오',description:'test'},{title:'제목2', lecturer:'22',description:'test2'}]}></LargeItemList>
                <CategoryList/>
                <CategorySection current={current} parent={parent} scroll={searchParams.has("list")}>
                    <ItemGridView lectures={sampleLectures} ItemComponent={TrackItem}/>
                </CategorySection>
                <RequestNotice keyword="트랙"/>
            </main>
        )
    } else return (
        <></>
    )
}