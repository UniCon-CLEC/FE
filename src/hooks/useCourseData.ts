"use client";

import type { CourseData, CourseType } from "@/data/course";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";

const fetchCourseData = async (type: CourseType): Promise<CourseData[]> => {
    const res = await request(`/courses/${type}`)
    if (!res.ok) throw new Error(`failed to fetch course data (type: ${type})`)
    return res.json()
}

export const useCourseData = (type: CourseType) => {
    return useQuery({
        queryKey: [ 'course',  { type } ],
        queryFn: async () => await fetchCourseData(type),
        staleTime: 1000 * 60 * 1 // 1 min
    })
}