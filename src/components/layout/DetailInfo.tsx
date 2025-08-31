"use client";

import { PropsWithChildren, useEffect, useState } from "react"
import { Back } from "../ui/button/Back"
import { ImgBox } from "../ui/core/ImgBox"
import { motion, useAnimate } from "motion/react"

const transitionDuration = 0.25
const ImageList = (props: { length: number }) => {
    const [index, setIndex] = useState<number>(0)
    const [scope, animate] = useAnimate()

    const next = () => {
        animate(scope.current, {
            opacity: 0,
            y: 20
        }, {
            duration: transitionDuration,
            ease: "circIn"
        }).then(() => {
            setIndex((prevIndex) => (prevIndex + 1) % props.length)
            return animate(scope.current, {
                opacity: 1,
                y: 0
            }, {
                duration: transitionDuration,
                ease: "circOut"
            })
        })
    }

    const prev = () => {
        animate(scope.current, {
            opacity: 0,
            y: 20
        }, {
            duration: transitionDuration,
            ease: "circIn"
        }).then(() => {
            setIndex((prevIndex) => (prevIndex - 1 + props.length) % props.length)
            return animate(scope.current, {
                opacity: 1,
                y: 0
            }, {
                duration: transitionDuration,
                ease: "circOut"
            })
        })
    }

    return (
        <div className="flex w-fit h-90 items-center gap-2 -translate-x-8">
            <motion.div className="cursor-pointer" onClick={prev}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </motion.div>
            <div className="h-full aspect-square relative">
                <div ref={scope}><ImgBox className="aspect-square"/></div>
                <div className="absolute bottom-2 right-2 bg-black/50 rounded-full h-5 w-14 text-white text-xs text-center flex items-center justify-center">
                    <span>{index + 1} / {props.length}</span>
                </div>
            </div>
            <motion.div className="cursor-pointer" onClick={next}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </motion.div>
        </div>
    )
}

export const DetailInfo = (props: PropsWithChildren<{ deadline: string, prevText: string, prevUrl: string, title: string, category: string, imgLength: number}>) => {
    return (
        <>
            <Back text={props.prevText} url={props.prevUrl}/>
            <div className="text-(--main) font-bold text-sm mt-5">{props.deadline}</div>
            <h1 className="font-bold text-2xl mt-3">{props.title}</h1>
            <h3 className="text-(--subtext) text-sm mt-1">{props.category}</h3>
            <div className="flex mt-8">
                <ImageList length={props.imgLength}/>
                <div>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export const DetailTable = (props: { data: { field: string, value: string }[] }) => {

    const makeItems = () => {
        return props.data.map(({ field, value }, index) => {
            return (
                <tr key={index}>
                    <td className="text-(--subtext)">{field}</td>
                    <td className="pl-5">{value}</td>
                </tr>
            )
        })
    }

    return (
        <table className="text-sm border-separate border-spacing-y-2">
            {makeItems()}
        </table>
    )
}

export const DetailContent = (props: { lectures: { title: string, desc: string }[] }) => {
    const [index, setIndex] = useState<number>(0)

    const contents = ["강의 소개", "커리큘럼", "준비물", "강사 소개"]

    const makeLectureItems = () => {
        return props.lectures.map(({ title, desc }, index) => {
            return (
                <li key={index} className="flex gap-5 mb-12">
                    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-14">
                        <rect x="1.5" y="1.5" width="47" height="47" rx="18.5" stroke="#D9D9D9" strokeWidth="3"/>
                        <text 
                            x="50%" 
                            y="50%" 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            fill="var(--subtext)"
                            className="font-bold text-xl"
                        >
                            {index + 1}
                        </text>
                    </svg>
                    <div>
                        <h2 className="text-lg font-bold mt-1">{title}</h2>
                        <div className="text-sm text-(--subtext) mt-1">강의 설명</div>
                        <p className="text-sm">{desc}</p>
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            <nav className="w-full h-11 mt-10 border-b-3 border-gray-300 text-(--subtext) flex font-bold text-sm">
                { contents.map((item, i) =>
                    <div key={i} className={`w-28 h-11 cursor-pointer flex items-center justify-center border-b-3 ${ index == i ? "text-black border-black" : "border-gray-300" }`}
                        onClick={() => setIndex(i)}>{item}</div>
                )}
            </nav>
            <article className="w-[70%]">
                { index === 0 &&
                    <>
                        <p className="my-10">
                            강의 설명
                        </p>
                    </>
                }
                { index === 1 &&
                    <ol className="my-10">
                        {makeLectureItems()}
                    </ol>
                }
                { index === 2 &&
                    <>
                        <p className="my-10">
                            준비물
                        </p>
                    </>
                }
                { index === 3 &&
                    <>
                        <p className="my-10">
                            강사 소개
                        </p>
                    </>
                }
            </article>
        </>
    )
}

const PriceSelectableView = (props: { items: { name: string, price: number, priceText?: string, priceOrig?: number, priceOrigText?: string }[], update: (price: number, orig: number) => void }) => {
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        change(index)
    }, [])

    const change = (num: number) => {
        setIndex(num)
        const item = props.items[num]
        props.update(item.price, item.priceOrig ?? item.price)
    }

    const makeItems = () => {
        return props.items.map(({ name, priceText, priceOrigText }, i) => {
            return (
                <li key={i} className={`py-4 cursor-pointer w-full mb-2 text-sm border-[1.25px] flex items-center px-3 rounded-md justify-between ${ index === i ? "border-(--main)" : "border-(--subtext)"}`}
                    onClick={() => change(i)}>
                    <span>{name}</span>
                    <div className="flex flex-col justify-end">
                        { priceOrigText &&
                            <div className="text-[11px] text-(--subtext) line-through">{priceOrigText}</div>
                        }
                        { priceText && <div className="font-bold">{priceText}</div> }
                    </div>
                </li>
            )
        })
    }

    return (
        <ol>
            {makeItems()}
        </ol>
    )
}

export const DetailPrice = (props: { buttonText: string }) => {
    const [prices, setPrices] = useState<number[]>([0, 0])
    const [origPrices, setOrigPrices] = useState<number[]>([0, 0])

    const totalOrig = origPrices.reduce((acc, cur) => acc + cur, 0)
    const total = prices.reduce((acc, cur) => acc + cur, 0)

    return (
        <aside className="shadow-md rounded-lg border border-gray-400 w-70 h-fit absolute right-0 top-20 px-6 py-8 translate-x-30">
            <h2 className="font-bold text-xl mb-5">수강권</h2>
            <PriceSelectableView update={(p, o) => {
                setPrices([ p, prices[1] ])
                setOrigPrices([ o, origPrices[1] ])
            }} items={[
                { name: "3개월 수강", priceText: "200,000원", price: 200000 },
                { name: "영구 소장", priceText: "200,000원", price: 200000 }
            ]}/>
            <h2 className="font-bold text-xl mb-5">패키지 구매</h2>
            <PriceSelectableView  update={(p, o) => {
                setPrices([ prices[0], p ])
                setOrigPrices([ origPrices[0], o ])
            }} items={[
                { name: "선택 안함", price: 0 },
                { name: "패키지 A", priceText: "+ 200,000원", price: 200000, priceOrigText: "단일가 260,000원", priceOrig: 260000 },
                { name: "패키지 B", priceText: "+ 200,000원", price: 200000, priceOrigText: "단일가 260,000원", priceOrig: 260000 },
            ]}/>
            <div className="flex justify-between items-end mt-10">
                <span className="text-(--subtext) text-sm py-1">TOTAL</span>
                <div className="flex flex-col items-end">
                    { total !== totalOrig && <div className="text-[10px] line-through text-(--subtext)">정상가 {totalOrig.toLocaleString()}원</div> }
                    <div className="font-bold text-xl">{total.toLocaleString()}원</div>
                </div>
            </div>
            <div className="flex mt-5 gap-2 w-full">
                <div>
                    <motion.button className="rounded-md border border-(--subtext) p-2 cursor-pointer"
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 1, transition: { duration: 0.1 } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--subtext)" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </motion.button>
                </div>
                <div className="grow">
                    <motion.button className="h-10 bg-(--main) shadow-md rounded-lg text-white w-full cursor-pointer"
                        whileHover={{ scale: 1.07, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 1, transition: { duration: 0.1 } }}>
                        {props.buttonText}
                    </motion.button>
                </div>
            </div>
        </aside>
    )
}