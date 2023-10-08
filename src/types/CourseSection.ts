export type CourseSection = {
  id: string;
  title: string;
  englishTitle: string;
  sequence: number;
  lessons: any[];
  gradeTypeIndex: number;
};

export type NewCourseSectionData = {
  title: string;
  englishTitle: string;
  gradeTypeIndex: number;
};
