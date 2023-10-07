export type Course = {
  id: string;
  title: string;
  englishTitle: string;
  name: string;
  englishName: string;
  sections: any[];
  gradeSubject: {
    id: string;
    logo: any;
    bookLink: any;
    gradeId: string;
    grade: any;
    subjectId: string;
    subject: any;
    teachersOrStudents: any;
    createdAt: string;
    lastUpdated: string;
  };
  numberOfLessons: number;
  description: string;
  englishDescription: string;
  author: string;
  logoPath: any;
  teacherId: any;
  courseStatus: number;
};

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
  filteredInList: boolean;
  minPrice: number;
  maxPrice: number;
  minNumberOfLessons: number;
  maxNumberOfLessons: number;
  name: string;
  rating: number[];
};
