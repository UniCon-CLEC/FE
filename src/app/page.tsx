"use client";

import { SliderView } from "@/components/ui/items/SliderView";
import { TrackItem } from "@/components/ui/items/TrackItem";
import React from "react";

const sampleLectures = Array.from({ length: 10 }, (v, i) => { 
    return { title: '강의 제목' + i, lecturer: '강사명' + i }
})


const Banner = (props: { title: string }) => {
    return (
        <div className="relative mb-35">
            <div className="flex gap-1 items-center w-fit mx-auto -translate-x-4">
                <span className="rounded-full bg-(--main) w-3 h-3 ml-2 mr-3"/>
                <span className="font-bold text-3xl">{props.title}</span>
            </div>
            <p className="text-(--subtext) w-fit mx-auto text-sm mt-3 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
            <SliderView lectures={sampleLectures} ItemComponent={TrackItem}/>
        </div>
    )
}

export default function Home() {

    return (
        <main className="w-(--page-width) mx-auto mt-35">
            <Banner title="지금 뜨는 트랙"/>
            <Banner title="베스트 트랙"/>
        </main>
    );
}
