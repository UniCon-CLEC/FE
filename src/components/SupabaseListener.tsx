"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const SupabaseListener = () => {
    const setSession = useAuthStore(useShallow((state) => state.setSession))

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                console.log('reset')
            }
        })

        return () => subscription.unsubscribe()
    }, [])
    
    return (<></>)
}