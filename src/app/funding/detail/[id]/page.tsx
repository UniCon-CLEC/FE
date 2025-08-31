"use client";

import { DetailContent, DetailInfo, DetailPrice, DetailTable } from "@/components/layout/DetailInfo";
import { Scrap } from "@/components/ui/core/Scrap";
import { motion } from "motion/react";

export default function FundingDetail() {

    return (
        <main className="w-(--page-width) mx-auto mt-25">
            <DetailInfo deadline="마감까지 D-1" prevText="펀딩" prevUrl="/funding" title="정글, 태어나다 <라이프 오브 아마조니아>" category="창업 | 비즈니스" imgLength={4}>
                <div className="text-sm text-(--subtext)">모인 금액</div>
                <div className="flex font-bold text-2xl gap-4 mt-1">
                    <div>12,345,667원</div>
                    <div className="text-(--main)">500%</div>
                </div>
                <div className="text-sm text-(--subtext) mt-4">남은 일수</div>
                <div className="font-bold text-2xl mt-1">2일 남음</div>
                <p className="text-(--subtext) text-sm mt-4">펀딩 한줄 소개말</p>

                <div className="mt-8">
                    <DetailTable data={[
                        { field: "후원자 수", value: "400명" },
                        { field: "목표 금액", value: "10,000,000원" },
                        { field: "펀딩 기간", value: "2024년 7월 21일 ~ 2024년 8월 26일" },
                        { field: "수강 시작일", value: "2024년 8월 26일" }
                    ]}/>
                </div>

                <div className="flex mt-2 items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 1, transition: { duration: 0.1 } }}>
                        <button className="w-80 h-9 bg-(--main) shadow-md rounded-lg text-white cursor-pointer">펀딩하기</button>
                    </motion.div>
                    <div className="w-7 h-7">
                        <Scrap size={28}/>
                    </div>
                </div>
            </DetailInfo>
            <div className="relative w-full">
                <DetailContent lectures={[
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                    { title: "강의 주제 제목 텍스트", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborez" },
                ]}/>
                <DetailPrice buttonText="펀딩하기"/>
            </div>
        </main>
    )
}