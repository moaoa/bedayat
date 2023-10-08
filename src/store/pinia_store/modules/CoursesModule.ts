import { defineStore } from "pinia";
import { Course, NewCourseData, CourseFilters } from "@/types/Courses";

import coursesService from "@/core/repositories/CoursesService";
import { useLocalStorage } from "@vueuse/core";
import CoursesService from "@/core/repositories/CoursesService";
import router from "@/router";

export const useCoursesStore = defineStore({
  id: "coursesStore",
  state: () => ({
    courses: [] as Course[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    searchValue: "",

    isSwitchingCourseStatus: false,

    selectedCourse: useLocalStorage<Partial<Course>>("selectedCourse", {}),
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadCourses(params: CourseFilters) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await coursesService.getCourses(params);

        this.courses = items;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectCourse() {
      this.selectedCourse = {};
    },
    selectCourse(selectedCourse: Course) {
      this.selectedCourse = selectedCourse;
    },
    async toggleCourseStatus(course: Course) {
      this.isSwitchingCourseStatus = true;
      try {
        await CoursesService.toggleCourseStatus(course.id);
        this.isSwitchingCourseStatus = false;
      } catch (error) {
        this.isSwitchingCourseStatus = false;
        console.log(error);
        throw error;
      }
    },
    async updateItem(newValues: NewCourseData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedCourse) {
          throw Error("no selected course");
        }

        const index = this.courses.findIndex(
          (course) => course.id === this.selectedCourse!.id
        );

        if (this.selectedCourse.id === undefined) {
          return;
        }

        await coursesService.updateCourse(this.selectedCourse.id, newValues);

        this.courses[index] = {
          ...(this.selectedCourse as Course),
          ...newValues,
        };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(courseData: NewCourseData) {
      this.isCreatingNewItem = true;
      try {
        const res = await coursesService.createCourse(courseData);
        this.courses.push(res.data.data);
        router.push({
          name: "CourseSections",
          params: { id: res.data.data.id },
        });
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
        throw error;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedCourse) {
        console.error("no course selected");
        return;
      }

      try {
        if (!this.selectedCourse.id) {
          return;
        }
        await coursesService.deleteCourse(this.selectedCourse.id);
        this.courses = this.courses.filter(
          (item) => item.id !== this.selectedCourse?.id
        );
        this.unselectCourse();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
