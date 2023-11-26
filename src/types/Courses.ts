import {
  string,
  number,
  object,
  array,
  Output,
  unknown,
  boolean,
  nullable,
} from "valibot";

export const CourseSchema = object({
  id: string(),
  title: string(),
  englishTitle: string(),
  name: string(),
  englishName: string(),
  sections: array(unknown()),
  gradeSubject: object({
    id: string(),
    logo: unknown(),
    bookLink: unknown(),
    gradeId: string(),
    grade: unknown(),
    subjectId: string(),
    subject: unknown(),
    teachersOrStudents: unknown(),
    createdAt: string(),
    lastUpdated: string(),
  }),
  numberOfLessons: number(),
  description: string(),
  englishDescription: string(),
  author: string(),
  logoPath: unknown(),
  teacherId: unknown(),
  courseStatus: number(),
  rating: number(),
  numberOfRatings: number(),
});

export type Course = Output<typeof CourseSchema>;

export const ResponseSchema = object({
  results: array(CourseSchema),
  statusCode: number(),
  isSuccess: boolean(),
  message: nullable(string()),
  pageNumber: number(),
  pageSize: number(),
  pageItemsCount: number(),
  rowsCount: number(),
  hasPrevious: boolean(),
  hasNext: boolean(),
  pagesCount: number(),
});

export type Response = Output<typeof ResponseSchema>;

export type NewCourseData = {
  title: string;
  englishTitle: string;
  name: string;
  englishName: string;
  description: string;
  englishDescription: string;
  gradeSubjectId: string;
  author: string;
  logo: Blob | null;
};

export type CourseFilters = {
  subjectIds: string[];
  minPrice: number;
  maxPrice: number;
  minNumberOfLessons: number;
  maxNumberOfLessons: number;
  name: string;
  rating: number[];
  currentPage: number;
  pageSize: number;
};
