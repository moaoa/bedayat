export type Lesson = {
  createdAt: string;
  description: string;
  durationAsSeconds: number;
  id: string;
  lastUpdated: string;
  lessonAttachments: LessonAttachment[];
  lessonType: number;
  sectionId: string;
  title: string;
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

export type LessonAttachment = {
  attachmentPath: string;
  attachmentType: number;
  createdAt: string;
  extension: string;
  id: string;
  lastUpdated: string;
  lesson: Lesson;
  lessonId: string;
  name: string;
  size: number;
};
