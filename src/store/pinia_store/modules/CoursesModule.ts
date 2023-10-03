import { defineStore } from "pinia";
import { Course, NewCourseData, CourseFilters } from "@/types/Courses";

import coursesService from "@/core/repositories/CoursesService";

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

    selectedCourse: null as Course | null,
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
      this.selectedCourse = null;
    },
    selectCourse(selectedCourse: Course) {
      this.selectedCourse = selectedCourse;
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

        await coursesService.updateCourse(this.selectedCourse.id, newValues);

        this.courses[index] = { ...this.selectedCourse, ...newValues };
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
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedCourse) {
        console.error("no course selected");
        return;
      }

      try {
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
