import {GradeSubject} from "@/types/GradeSubjects";

export interface PackageAddData {
    courseIds: string[]
    gradeId: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    logo: File | string | null
}

export interface PackageUpdateData {
    packageId:string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    logo: File | string | null
}


export type PackageFilter = {
    status: PackageStatus;
    name: string;
    gradeId: string;
    packageType: PackageType;
};
export enum PackageStatus{
    Inactive,
    Active,
}

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

export interface GetPackagesResponseDto {
    id: string
    title: string
    englishTitle: string
    description: string
    englishDescription: string
    price: number
    logoPath: string
    coursesCount: number
    packageType: PackageType
    packageStatus: PackageStatus
    createdAt: string
    lastUpdated: string
}
export enum PackageType
{
    Course, Path
}

///////////////////// courses Selection

export interface CourseSelection {
    id: string
    title: string
    englishTitle: string
    name: string
    englishName: string
    sections: any[]
    gradeSubject: GradeSubject
    numberOfLessons: number
    description: string
    englishDescription: string
    author: string
    logoPath: string
    teacherId: string
    courseStatus: PackageStatus
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

