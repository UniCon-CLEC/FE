"use client";

import { supabase } from "./supabaseClient";

export const login = async (id: string, pw: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email: id, password: pw });

    if (error) {
        return false
    } else {
        return true
    }
}