"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const SupabaseListener = () => {
    const [setSession, setUser] = useAuthStore(useShallow((state) => [state.setSession, state.setUser]))

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                setUser(null)
                console.log('reset')
            }
        })

        return () => subscription.unsubscribe()
    }, [])
    
    return (<></>)
}