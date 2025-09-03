"use client";

import type { MeData } from "@/data/me";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";

const fetchMeData = async (): Promise<MeData> => {
    const res = await request('/me', { method: 'GET' }, true)
    if (!res.ok) throw new Error(`failed to fetch me`)
    return res.json()
}

export const useMeData = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: fetchMeData,
        staleTime: 1000 * 60 * 1 // 1 min
    })
}