"use client";

import { useAuthStore } from "@/store/useAuthStore"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_URL) throw new Error("No API URL")

export const request = async (endpoint: string, options: RequestInit = {}, withToken: boolean = false): Promise<Response> => {
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    if (withToken) {
        const session = useAuthStore.getState().session

        if (!session) {
            throw new Error('Failed to get session')
        }

        const token = session.access_token

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const response = await fetch(`${API_URL}${endpoint}`, config)

    return response
}