export interface PackageAddData {
    courseIds: string[]
    gradeId: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    logo: File | string | null
}
export type PackageFilter = {
    status: boolean;
    name: string;
    gradeId: string;

};

export interface SelectCoursesDto {
    id: string;
    name: string;
    englishName: string;
    subjectName: string;
    logoPath: string;
}


export interface Package {
    id: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    gradeSubjectId: string
    price: number
    logoPath: string
    packageStatus: string
    courses: Course[]
    packageType: string
    createdAt: string
    lastUpdated: string
}

export interface Course {
    id: string
    title: string
    englishTitle: string
    name: string
    englishName: string
    description: string
    englishDescription: string
    gradeSubjectId: string
    numberOfLessons: number
    author: string
    logoPath: string
    teacherId: string
    courseStatus: string
    createdAt: string
    lastUpdated: string
    rating: number
    numberOfRatings: number
}

