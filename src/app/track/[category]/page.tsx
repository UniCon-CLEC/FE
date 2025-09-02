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
import { useCourseData } from "@/hooks/useCourseData";

const genCompareFunc = (cid: number) => ({ id }: CategoryInfo) => id === cid
export default function Track({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params)
    const searchParams = useSearchParams()

    const [current, setCurrent] = useState<CategoryInfo | null>(null)
    const [parent, setParent] = useState<CategoryInfo | null>(null)

    const { data, isLoading, error } = useCourseData('track')
    
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
                { data &&
                    <>
                        <LargeItemList title={`${(parent ?? current).name} 인기 트랙`} ItemComponent={TrackLargeItem} courses={data}></LargeItemList>
                        <CategoryList/>
                        <CategorySection current={current} parent={parent} scroll={searchParams.has("list")}>
                            <ItemGridView courses={data} ItemComponent={TrackItem}/>
                        </CategorySection>
                    </>
                }
                <RequestNotice keyword="트랙"/>
            </main>
        )
    } else return (
        <></>
    )
}