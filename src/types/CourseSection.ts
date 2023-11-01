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

export const CourseSectionSchema = object({
  id: string(),
  title: string(),
  englishTitle: string(),
  sequence: number(),
  lessons: array(unknown()),
  gradeTypeIndex: number(),
});

export type CourseSection = Output<typeof CourseSectionSchema>;

export type NewCourseSectionData = {
  title: string;
  englishTitle: string;
  gradeTypeIndex: number;
};

export const ResponseSchema = object({
  data: nullable(array(CourseSectionSchema)),
  isSuccess: boolean(),
  message: nullable(string()),
  statusCode: string(),
});

export type Response = Output<typeof ResponseSchema>;
