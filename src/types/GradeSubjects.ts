export type Subject = {
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

export type NewGradeData = {
  gradeId: string;
};
