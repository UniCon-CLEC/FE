"use client";

import { useAuthStore } from "@/store/useAuthStore"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_URL) throw new Error("No API URL")

export const request = async (endpoint: string, method: string = "GET", withToken: boolean = false): Promise<Response> => {
    let response: Response

    if (withToken) {
        const session = useAuthStore.getState().session

        if (!session) {
            throw new Error('Failed to get session')
        }

        const token = session.access_token

        response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } else {
        response = await fetch(`${API_URL}${endpoint}`, {
            method,
        })
    }

    return response
}