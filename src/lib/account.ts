"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "./supabaseClient";
import { request } from "./request";

export const login = async (id: string, pw: string): Promise<boolean> => {
    const setUser = useAuthStore.getState().setUser

    const { error } = await supabase.auth.signInWithPassword({ email: id, password: pw });

    if (error) {
        return false
    } else {
        const data = await (await request("/me", "GET", true)).json()
    
        console.log('setuser')
        setUser(data)

        return true
    }
}