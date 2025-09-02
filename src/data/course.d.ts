type CourseType = 'track' | 'funding' | 'crew'

interface InstructorData {
    id: string,
    name: string,
    image: string,
}

interface CourseData {
    courseId: string,
    title: string,
    instructor: InstructorData,
    courseStartDate: string,
    averageRating: number,
    coverImageUrl: string,
    description: string,
    tags: string[]
}