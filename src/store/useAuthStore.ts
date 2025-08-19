import { create } from "zustand"

export interface InstructorData {
    id: string,
    name: string,
    image: string,
    schedule: string,
    information: string
}

export interface CourseData {
    courseId: string,
    title: string,
    courseStatus: "FUNDING" | "ACTIVE" | "COMPLETED" | "CANCELED",
    coverImageUrl: string,
    instructor: InstructorData,
    enrollmentStatus: "PLEDGED" | "PAID" | "PAYMENT_FAILED" | "CANCELED",
    fundingProgress: number,
    fundingStartDate: string,
    fundingEndDate: string,
    courseStartDate: string
}

export interface AuthState {
    id: string,
    name: string,
    profileImageUrl: string,
    tags: string[],
    enrolledCourses: CourseData[]
}

export interface AuthStore {
    isLoggedIn: boolean,
    user: AuthState | null,
    setUser: (user: AuthState) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isLoggedIn: false,
    user: null,
    setUser: (user) => set({ user, isLoggedIn: true }),
}))