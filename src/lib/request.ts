"use client";

import { useAuthStore } from "@/store/useAuthStore"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_URL) throw new Error("No API URL")

export const request = async (endpoint: string, method: string = "GET"): Promise<Response> => {
    const session = useAuthStore.getState().session

    if (!session) {
        throw new Error('Failed to get session')
    }

    const token = session.access_token

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    console.log('request')

    return response
}