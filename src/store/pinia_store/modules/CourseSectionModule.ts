import { defineStore } from "pinia";
import { CourseSection, NewCourseSectionData } from "@/types/CourseSection";

import courseSectionService from "@/core/repositories/CourseSectionsService";
import { useLocalStorage } from "@vueuse/core";
import CourseSectionServise from "@/core/repositories/CourseSectionsService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

export const useCourseSectionsStore = defineStore({
  id: "courseSectionsStore",
  state: () => ({
    courseSections: [] as CourseSection[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    searchValue: "",

    isSwitchingCourseSectionStatus: false,

    selectedCourseSection: useLocalStorage<Partial<CourseSection>>(
      "selectedCourseSection",
      {}
    ),
    gradeTypeOfCurentCourseOrSection: AppConstants.GradeTypes.Yearly,

    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadCourseSection(courseId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await courseSectionService.getCourseSections(courseId);

        this.courseSections = items;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async getGradeTypeBySectionId(sectionId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const res = await CourseSectionServise.getGradeTypeBySectionId(
          sectionId
        );
        console.log(res);
        this.gradeTypeOfCurentCourseOrSection = res.data.data;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async getGradeTypeByCourseId(courseId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const res = await CourseSectionServise.getGradeTypeByCourseId(courseId);
        console.log(res);
        this.gradeTypeOfCurentCourseOrSection = res.data.data;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectCourseSection() {
      this.selectedCourseSection = {};
    },
    selectCourseSection(selectedCourseSection: CourseSection) {
      this.selectedCourseSection = selectedCourseSection;
    },
    async updateItem(newValues: NewCourseSectionData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedCourseSection) {
          throw Error("no selected course");
        }

        const index = this.courseSections.findIndex(
          (course) => course.id === this.selectedCourseSection!.id
        );

        if (this.selectedCourseSection.id === undefined) {
          return;
        }

        await courseSectionService.updateCourseSection(
          this.selectedCourseSection.id,
          newValues
        );

        this.courseSections[index] = {
          ...(this.selectedCourseSection as CourseSection),
          ...newValues,
        };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(courseId: string, courseData: NewCourseSectionData) {
      this.isCreatingNewItem = true;
      try {
        const res = await courseSectionService.createSection(
          courseId,
          courseData
        );
        this.courseSections.push(res.data.data);
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
        throw error;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedCourseSection) {
        console.error("no course selected");
        return;
      }

      try {
        if (!this.selectedCourseSection.id) {
          return;
        }
        await courseSectionService.deleteCourseSection(
          this.selectedCourseSection.id
        );
        this.courseSections = this.courseSections.filter(
          (item) => item.id !== this.selectedCourseSection?.id
        );
        this.unselectCourseSection();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
