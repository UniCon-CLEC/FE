"use client";

import { useRef, useState } from "react"
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { login } from "@/lib/account";


export default function Login() {
    const id = useRef<HTMLInputElement>(null)
    const pw = useRef<HTMLInputElement>(null)

    const [isFailed, setIsFailed] = useState<boolean>(false)

    const router = useRouter()

    const handleChange = () => {
        if (isFailed) setIsFailed(false)
    }

    const handleLogin = async () => {
        if (await login(id.current?.value ?? '', pw.current?.value ?? '')) {
            router.push('/')
        } else {
            setIsFailed(true)
        }
    }

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl mb-10">로그인</h1>
            <div>
                <div>
                    <motion.input type="email" className={`w-70 border rounded-lg px-3 py-1 outline-none ${ isFailed ? "border-(--main)" : "border-(--subtext) focus:border-black"}`} placeholder="이메일"
                        whileFocus={{ scale: 1.1 }} transition={{ duration: 0.2 }} ref={id} onChange={handleChange}></motion.input>
                </div>
                <div className="mt-2">
                    <motion.input type="password" className={`w-70 border rounded-lg px-3 py-1 outline-none ${ isFailed ? "border-(--main)" : "border-(--subtext) focus:border-black"}`} placeholder="비밀번호"
                        whileFocus={{ scale: 1.1 }} transition={{ duration: 0.2 }} ref={pw} onChange={handleChange}></motion.input>
                </div>
                <motion.button className="w-70 h-10 text-white bg-(--main) shadow-md rounded-lg mt-5 cursor-pointer"
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 }}}
                    whileTap={{ scale: 1, transition: { duration: 0.1 }}}
                    onClick={handleLogin}>
                        로그인
                </motion.button>
            </div>
        </main>
    )
}