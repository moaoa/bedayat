export type Grade = {
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

export type NewGradeData = Omit<
  Grade,
  "id" | "createdAt" | "lastUpdated" | "courses" | "gradeSubjects"
>;
