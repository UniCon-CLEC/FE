"use client";

import { useState } from "react";

type props = { src?: string, className?: string, alt?: string }
export const ImgBox = ({ src, className, alt }: props) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <div className={`bg-(--loading-bg) rounded-lg overflow-hidden ${className ? className : ""}`}>
        {src && (
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
        )}
        </div>
    )
}