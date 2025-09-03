import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import useListRef from "@/hooks/useListRef"
import { AnimatePresence, motion } from "framer-motion"
import type { Survey } from "@/data/survey"
import SurveyItem from "@/components/ui/items/SurveyItem"

type SurveySliderProps = {
    surveys: Survey[];
    onDelete: (id: string) => void;
    onLike: (id: string) => void;
}
export const SurveySlider = ({ surveys, onDelete, onLike }: SurveySliderProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const scopeRef = useRef<HTMLDivElement | null>(null)
    const [targetRefs, getTargetRef] = useListRef<HTMLDivElement>()

    const [next, setNext] = useState<HTMLElement | null>(null)
    const [prev, setPrev] = useState<HTMLElement | null>(null)
    const [arrowState, setArrowState] = useState<'none' | 'left' | 'all' | 'right'>('right');

    const obsMap = useRef(new Map<Element, boolean>())
    
    const makeItems = () => {
        return surveys.map((survey, index) => {
            return (
                <motion.div className="cursor-pointer mt-5 flex-shrink-0 scroll-snap-start" key={survey.id}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.1 }}
                    ref={getTargetRef(index)}>
                    <SurveyItem topic={survey} onDelete={onDelete} onLike={onLike}/>
                </motion.div>
            )
        })
    }

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => obsMap.current.set(entry.target, entry.intersectionRatio > 0.95))

            const states = targetRefs.current.filter(Boolean).map(e => ({ element: e as HTMLElement, visible: obsMap.current.get(e) }))

            if (states.length === 0) return;

            const firstVisibleIdx = states.findIndex(v => v.visible)
            const lastVisibleIdx = states.findLastIndex(v => v.visible)
            const isAllVisible = firstVisibleIdx === 0 && lastVisibleIdx === states.length - 1;

            if (isAllVisible) {
                setArrowState('none');
            } else if (firstVisibleIdx === 0) {
                setArrowState("right");
            } else if (lastVisibleIdx === states.length - 1) {
                setArrowState("left");
            } else {
                setArrowState("all");
            }

            const newNext = (states.find((v, i) => i > lastVisibleIdx && !v.visible) ?? states.at(-1))?.element
            if (newNext) setNext(newNext)
            const newPrev = (states.findLast((v, i) => i < firstVisibleIdx && !v.visible) ?? states.at(0))?.element
            if (newPrev) setPrev(newPrev)
        }, {
            root: scopeRef.current,
            threshold: [0.95, 1]
        })

        const currentObserver = observerRef.current;

        targetRefs.current.filter(Boolean).forEach((e) => {
            currentObserver.observe(e)
        })

        return () => {
            currentObserver.disconnect()
        }

    }, [surveys, getTargetRef, targetRefs])

    return (
        <div className="flex w-full items-center gap-x-2">
            <AnimatePresence>
                {(arrowState === "all" || arrowState === "left") && 
                    <motion.button 
                        className="cursor-pointer rounded-full p-2 hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                            if(scopeRef.current){
                                if (scopeRef.current.scrollLeft <= scopeRef.current.clientWidth) {
                                    scopeRef.current.scrollTo({
                                        left: 0,
                                        behavior: "smooth"
                                    });
                                } else {
                                    scopeRef.current.scrollBy({
                                        left: -scopeRef.current.clientWidth,
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }}>
                        <Image src={"/icons/left.png"} width={20} height={20} alt="이전"/>
                    </motion.button>
                }
            </AnimatePresence>
            <div className="flex-1 overflow-x-scroll flex h-fit gap-x-4 hide-scrollbar scroll-smooth scroll-snap-x scroll-snap-mandatory" ref={scopeRef}>
                {makeItems()}
            </div>

            <AnimatePresence>
                {(arrowState === "all" || arrowState === "right") &&
                    <motion.button 
                        className="cursor-pointer rounded-full p-2 hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                            if(scopeRef.current){
                                const { scrollWidth, clientWidth, scrollLeft } = scopeRef.current;
                                const maxScrollLeft = scrollWidth - clientWidth;
                                if (scrollLeft >= maxScrollLeft - clientWidth) {
                                     scopeRef.current.scrollTo({
                                        left: scrollWidth,
                                        behavior: "smooth"
                                    });
                                } else {
                                    scopeRef.current.scrollBy({
                                        left: clientWidth,
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }}>
                        <Image src={"/icons/right.png"} width={20} height={20} alt="다음"/>
                    </motion.button>
                }
            </AnimatePresence>
        </div>
    )
}