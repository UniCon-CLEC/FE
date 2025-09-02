export type CourseType = 'track' | 'funding' | 'crew'

export interface InstructorData {
    id: string,
    name: string,
    image: string,
}

export interface CourseData {
    courseId: string,
    title: string,
    instructor: InstructorData,
    courseStartDate: string,
    averageRating: number,
    coverImageUrl: string,
    description: string,
    tags: string[]
}

export interface FundingCourseData extends CourseData {
    fundingTargetAmount: number,
    totalFundedAmount: number,
    achievementRate: number,
}