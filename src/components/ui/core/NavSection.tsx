"use client";

import { PropsWithChildren, useEffect, useRef } from "react"

type NavSectionProps = PropsWithChildren<{
    data: { id: string, content: string },
    set: (id: string) => void
}>
export const NavSection = ({ data, children, set }: NavSectionProps) => {
    const observerRef = useRef<IntersectionObserver>(null)
    const targetRef = useRef<HTMLElement>(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    set(data.id)
                }
            })
        }, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        })

        if (targetRef.current) observerRef.current.observe(targetRef.current)

        return () => {
            observerRef.current?.disconnect()
        }
    }, [])

    return (
        <section id={data.id} ref={targetRef} className="mt-25 scroll-mt-20 min-h-100">
            <h1 className="text-2xl font-bold pl-2 mb-5">{data.content}</h1>
            {children}
        </section>
    )
}