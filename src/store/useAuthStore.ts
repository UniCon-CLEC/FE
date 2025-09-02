import { create } from "zustand"
import type { Session } from "@supabase/supabase-js";
import { devtools } from "zustand/middleware";

export interface AuthStore {
    session: Session | null,
    setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            user: null,
            session: null,
            setSession: (session) => set({ session })
        }),
        { name: "AuthStore" }
    )
)