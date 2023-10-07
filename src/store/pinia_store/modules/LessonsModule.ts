import { defineStore } from "pinia";
import { Lesson, NewLessonData } from "@/types/Lessons";

import lessonService from "@/core/repositories/LessonsService";
import { useLocalStorage } from "@vueuse/core";

export const useLessonsStore = defineStore({
  id: "lessonsStore",
  state: () => ({
    lessons: [] as Lesson[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    isSwitchingLessonStatus: false,

    selectedLesson: useLocalStorage<Partial<Lesson>>("selectedLesson", {}),
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadLessons(courseId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await lessonService.getLessons(courseId);

        this.lessons = items;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectLesson() {
      this.selectedLesson = {};
    },
    selectLesson(selectedLesson: Lesson) {
      this.selectedLesson = selectedLesson;
    },
    async updateItem(newValues: NewLessonData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedLesson) {
          throw Error("no selected course");
        }

        const index = this.lessons.findIndex(
          (course) => course.id === this.selectedLesson!.id
        );

        if (this.selectedLesson.id === undefined) {
          return;
        }

        await lessonService.updateLesson(this.selectedLesson.id, newValues);

        this.lessons[index] = {
          ...(this.selectedLesson as Lesson),
          ...newValues,
        };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(courseId: string, courseData: NewLessonData) {
      this.isCreatingNewItem = true;
      try {
        const res = await lessonService.createNewLesson(courseId, courseData);
        this.lessons.push(res.data.data);
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
        throw error;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedLesson) {
        console.error("no course selected");
        return;
      }

      try {
        if (!this.selectedLesson.id) {
          return;
        }
        await lessonService.deleteLesson(this.selectedLesson.id);
        this.lessons = this.lessons.filter(
          (item) => item.id !== this.selectedLesson?.id
        );
        this.unselectLesson();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
