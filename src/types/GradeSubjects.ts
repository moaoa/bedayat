import {Subject} from "@/types/Subjects";
import {Grade} from "@/types/Grades";

export type GradeSubject = {
  id: string;
  subject: Subject;
  subjectId: string;
  grade: Grade;
  gradeId: string;
  logo: string;
  bookLink: string;
  createdAt: string;
  lastUpdated: string;
};

export type NewGradeSubjectData = {
  subjectId: string;
  logo: File| null;
  book: File| null;
  gradeId: string;
};