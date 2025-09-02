import Image from "next/image"
import { ItemProps } from "./BaseItem"
import { useEffect, useRef, useState } from "react"
import useListRef from "@/hooks/useListRef"
import { AnimatePresence, motion } from "motion/react"

type SliderViewProps = {
    courses: CourseData[]
    ItemComponent: React.ComponentType<ItemProps>
}
export const SliderView = ({ courses, ItemComponent }: SliderViewProps) => {
    const observerRef = useRef<IntersectionObserver>(null)
    const scopeRef = useRef<HTMLDivElement | null>(null)
    const [targetRefs, getTargetRef] = useListRef<HTMLElement>()

    const [next, setNext] = useState<HTMLElement | null>(null)
    const [prev, setPrev] = useState<HTMLElement | null>(null)
    const [arrowState, setArrowState] = useState<'left' | 'all' | 'right'>('right')

    const obsMap = useRef(new Map<Element, boolean>())
    
    const makeItems = () => {
        return courses.map((course, index) => {
            return (
                <motion.div className="cursor-pointer mt-5" key={index}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.1 }}>
                    <ItemComponent course={course} className="min-w-50" ref={getTargetRef(index)}/>
                </motion.div>
            )
        })
    }

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => obsMap.current.set(entry.target, entry.intersectionRatio > 0.95))

            const states = targetRefs.current.filter(Boolean).map(e => ({ element: e, visible: obsMap.current.get(e) }))

            const firstVisibleIdx = states.findIndex(v => v.visible)
            const lastVisibleIdx = states.findLastIndex(v => v.visible)

            if (firstVisibleIdx === 0) setArrowState("right")
            else if (lastVisibleIdx === states.length - 1) setArrowState("left")
            else setArrowState("all")

            const newNext = (states.find((v, i) => i > lastVisibleIdx && !v.visible) ?? states.at(-1))?.element
            if (newNext) setNext(newNext)
            const newPrev = (states.findLast((v, i) => i < firstVisibleIdx && !v.visible) ?? states.at(0))?.element
            if (newPrev) setPrev(newPrev)
        }, {
            root: scopeRef.current,
            threshold: [0, 0.5, 0.95, 1]
        })

        targetRefs.current.forEach((e) => {
            if (e) observerRef.current?.observe(e)
        })

        return () => {
            observerRef.current?.disconnect()
        }
    }, [])

    return (
        <div className="flex gap-x-2 -translate-x-8">
            <div className="w-20 mt-27">
                <AnimatePresence>
                    { arrowState !== "right" && 
                        <motion.div className="cursor-pointer"
                            whileTap={{ scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}>
                            <Image src={"/icons/left.png"} width={20} height={20} alt="" onClick={() => {
                                if (prev)
                                    scopeRef.current?.scrollTo({
                                        left: prev.offsetLeft + prev.offsetWidth - scopeRef.current.clientWidth,
                                        behavior: "smooth"
                                    })
                            }}/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            <div className="overflow-x-scroll flex h-fit gap-x-10 hide-scrollbar" ref={scopeRef}>
                {makeItems()}
            </div>
            <div className="w-20 mt-27">
                <AnimatePresence>
                    { arrowState !== "left" &&
                        
                            <motion.div className="cursor-pointer"
                                whileTap={{ scale: 1.5 }}
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}>
                                <Image src={"/icons/right.png"} width={20} height={20} alt="" onClick={() => scopeRef.current?.scrollTo({
                                    left: next?.offsetLeft,
                                    behavior: "smooth"
                                })}/>
                            </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}