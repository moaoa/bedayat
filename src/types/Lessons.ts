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

export const LessonAttachmentSchema = object({
  attachmentPath: string(),
  attachmentType: number(),
  createdAt: string(),
  extension: string(),
  id: string(),
  lastUpdated: string(),
  lesson: unknown(),
  lessonId: string(),
  name: string(),
  size: number(),
});

export const LessonSchema = object({
  createdAt: string(),
  description: string(),
  durationAsSeconds: number(),
  id: string(),
  lastUpdated: string(),
  lessonAttachments: array(LessonAttachmentSchema),
  lessonType: number(),
  sectionId: string(),
  title: string(),
});

export type Lesson = Output<typeof LessonSchema>;

export type Course = Output<typeof LessonSchema>;

export const ResponseSchema = object({
  data: nullable(array(LessonSchema)),
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
};

export type NewLessonData = {
  title: string;
  description: string;
  lessonType: number;
};

export type AttachmentForm = {
  image: File | null;
  content: File | null;
  additionalContent: File | null;
};

export type UploadedLessonAttachment = Output<typeof LessonAttachmentSchema>;

export type NewLessonAttachmentData = {
  file: File;
  attachmentType: number;
  attachmentName: string;
  lessonId: string;
  mimeType: string;
  size: number;
  title: string;
  resolution: string;
  description: string;
};
