import { defineStore } from "pinia";
import {
  LessonSchema,
  UploadedLessonAttachment,
  NewLessonData,
  Lesson,
} from "@/types/Lessons";

import lessonService from "@/core/repositories/LessonsService";
import { useLocalStorage } from "@vueuse/core";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import Toaster from "@/core/services/Toaster";
import i18n from "@/core/plugins/i18n";
import saveFile from "@/core/helpers/saveFile";

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
    isAddingAttachment: false,

    selectedLesson: useLocalStorage<Partial<Lesson>>("selectedLesson", {}),
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),
  getters: {
    getLessonContentForSelectedLesson(state) {
      return state.selectedLesson?.lessonAttachments?.find(
        (item) =>
          item.attachmentType === AppConstants.ATTATCHMENT_TYPES.LessonContent
      );
    },
    getImageAttachmentForSelectedLesson(state) {
      return state.selectedLesson?.lessonAttachments?.find(
        (item) =>
          item.attachmentType === AppConstants.ATTATCHMENT_TYPES.PreviewImage
      );
    },
    getAdditionalContentAttachmentForSelectedLesson(
      state
    ): UploadedLessonAttachment | undefined {
      return state.selectedLesson?.lessonAttachments?.find(
        (item) =>
          item.attachmentType ===
          AppConstants.ATTATCHMENT_TYPES.AdditionalContent
      );
    },
  },
  actions: {
    async loadLessons(courseId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await lessonService.getLessons(courseId);

        this.lessons = items ?? [];
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async getAttachmentLinkById(attachmentId: string) {
      this.errorLoadingData = false;

      try {
        const link = await lessonService.getAttachmentLinkById(attachmentId);
        saveFile(link, "attachment");
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async addAttachmentToLesson(params: {
      file: File;
      attachmentType: number;
      attachmentName: string;
      mimeType: string;
      size: number;
      title: string;
      resolution: string;
      description: string;
    }) {
      this.isAddingAttachment = true;
      this.errorLoadingData = false;

      try {
        const items = await lessonService.addAttachmentToLesson({
          ...params,
          lessonId: this.selectedLesson!.id!,
        });

        this.selectedLesson!.lessonAttachments?.push(items.data.data);

        Toaster.Success(i18n.global.t("attachmentAddedSuccessfully"));
      } catch (e) {
        console.log((e as Error).message);
        Toaster.error((e as Error).message);
        throw e;
      } finally {
        this.isAddingAttachment = false;
      }
    },
    async removeAttachmentFromLesson(attachmentId: string) {
      this.isAddingAttachment = true;
      this.errorLoadingData = false;

      if (!this.selectedLesson?.id) {
        return;
      }

      try {
        await lessonService.removeAttachmentFromLesson(
          this.selectedLesson.id,
          attachmentId
        );
        this.selectedLesson.lessonAttachments =
          this.selectedLesson.lessonAttachments?.filter(
            (item) => item.id !== attachmentId
          );
        Toaster.Success(i18n.global.t("attachmentRemovedSuccessfully"));
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.isAddingAttachment = false;
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
