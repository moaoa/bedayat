export type Lesson = {
  id: string;
  title: string;
  description: string;
  lessonType: string;
};

export type NewLessonData = Omit<Lesson, "id">;
