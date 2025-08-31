"use client";

import { DetailContent, DetailInfo, DetailPrice, DetailTable } from "@/components/layout/DetailInfo";
import { Scrap } from "@/components/ui/core/Scrap";
import { motion } from "motion/react";

export default function TrackDetail() {

    return (
        <main className="w-(--page-width) mx-auto mt-25">
            <DetailInfo deadline="할인 마감까지 D-1" prevText="트랙" prevUrl="/track" title="정글, 기회의 땅 <라이프 오브 아마조니아>" category="창업 | 비즈니스" imgLength={4}>
                <div className="text-sm text-(--subtext)">
                    <span>판매 가격 </span>
                    <span className="line-through">400,000원</span>
                </div>
                <div className="flex font-bold text-2xl gap-4 mt-1">
                    <div>360,000원</div>
                    <div className="text-(--main)">10% 할인</div>
                </div>
                <div className="text-sm text-(--subtext) mt-4">패키지 프로모션 종료까지</div>
                <div className="font-bold text-2xl mt-1">12일 남음</div>
                <p className="text-(--subtext) text-sm mt-4">트랙 한줄 소개말</p>

                <div className="mt-8">
                    <DetailTable data={[
                        { field: "수강자 수", value: "400명" },
                        { field: "배경지식", value: "배경지식 필요" },
                        { field: "강좌 정보", value: "온라인 / 7파트 약 35시간 / 영어 자막 제공" },
                        { field: "강의 키워드", value: "#개척 #비즈니스 #사업 #정글 #사업자" }
                    ]}/>
                </div>

                <div className="flex mt-2 items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 1, transition: { duration: 0.1 } }}>
                        <button className="w-80 h-9 bg-(--main) shadow-md rounded-lg text-white cursor-pointer">수강권 선택하기</button>
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