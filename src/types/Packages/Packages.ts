export interface PackageAddData {
    courseIds: string[]
    gradeId: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    logo: File | string | null
}

export interface Package {
    id: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    gradeSubjectId: string
    price: number
    gradeSubject: GradeSubject
    logoPath: string
    packageStatus: string
    courses: Course[]
    packageType: string
    createdAt: string
    lastUpdated: string
}

export interface GradeSubject {
    id: string
    chaptersCount: number
    logo: string
    bookLink: string
    gradeId: string
    grade: Grade
    subjectId: string
    subject: Subject
    createdAt: string
    lastUpdated: string
}

export interface Grade {
    id: string
    name: string
    englishName: string
    priority: number
    note: string
    gradeType: string
    gradeSubjects: string[]
    courses: string[]
    createdAt: string
    lastUpdated: string
}

export interface Subject {
    id: string
    name: string
    englishName: string
    note: string
    subjectType: string
    gradeSubjects: string[]
    courses: string[]
    createdAt: string
    lastUpdated: string
}


export interface Children {
    id: string
    parentId: string
    parent: string
    isMainParent: boolean
    childId: string
    child: string
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

