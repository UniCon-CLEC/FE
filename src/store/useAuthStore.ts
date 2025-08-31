import { create } from "zustand"
import type { Session } from "@supabase/supabase-js";
import { devtools } from "zustand/middleware";

export interface InstructorData {
    id: string,
    name: string,
    image: string | null,
    schedule: string | null,
    information: string | null
}

export interface CourseData {
    courseId: string,
    title: string,
    courseStatus: "FUNDING" | "ACTIVE" | "COMPLETED" | "CANCELED",
    instructor: InstructorData,
    enrollmentStatus: "PLEDGED" | "PAID" | "PAYMENT_FAILED" | "CANCELED",
    introduction: CourseIntroductionData | null; 
    fundingProgress: number,
    fundingStartDate: string,
    fundingEndDate: string,
    courseStartDate: string
}

export interface CourseIntroductionData {
  coverImageUrl?: string;
  description?: string;
  scheduleDetails?: string;
}

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