import { create } from "zustand"
import type { Session } from "@supabase/supabase-js";
import { devtools } from "zustand/middleware";

export interface AuthState {
    id: string,
    email: string,
    name: string,
    profileImageUrl: string,
    tags: string[],
    enrolledCourses: CourseData[]
}

export interface AuthStore {
    user: AuthState | null,
    session: Session | null,
    setUser: (user: AuthState | null) => void
    setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            user: null,
            session: null,
            setUser: (user) => set({ user }),
            setSession: (session) => set({ session })
        }),
        { name: "AuthStore" }
    )
)