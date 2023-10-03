export type Course = {
  id: string;
  name: string;
  englishName: string;
  priority: number;
  gradeType: number;
  note: string;
  gradeSubjects: unknown[];
  courses: unknown[];
  createdAt: string;
  lastUpdated: string;
};

export type NewCourseData = Omit<
  Course,
  "id" | "createdAt" | "lastUpdated" | "courses" | "gradeSubjects"
>;

export type CourseFilters = {
  subjectIds: string[];
  filteredInList: boolean;
  minPrice: number;
  maxPrice: number;
  minNumberOfLessons: number;
  maxNumberOfLessons: number;
  name: string;
  rating: number[];
};
