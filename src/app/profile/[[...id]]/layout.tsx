"use client";

import { ProfileArea } from "@/components/layout/ProfileArea";
import { use } from "react";
import { ProfileContext } from "./ProfileContext";

export default function ProfileLayout({ children, params }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id?: string[] }>
}>) {
    const _params = use(params)
    const id = _params.id?.at(0)

    return (
        <ProfileContext value={id}>
            <ProfileArea/>
            {children}
        </ProfileContext>
    );
}
