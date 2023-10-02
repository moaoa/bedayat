export type Subject = {
  id: string;
  name: string;
  englishName: string;
  priority: number;
  subjectType: SubjectType;
  note: string;
  gradeSubjects: unknown[];
  courses: unknown[];
  createdAt: string;
  lastUpdated: string;
};

export type NewSubjectData = Omit<
  Subject,
  "id" | "createdAt" | "lastUpdated" | "courses" | "gradeSubjects"
>;
export enum SubjectType {
  None,
  Literary ,
  Scientific,
}

