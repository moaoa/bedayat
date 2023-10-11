import { defineStore } from "pinia";
import { Course, CourseFilters, NewCourseData } from "@/types/Courses";

import coursesService from "@/core/repositories/CoursesService";

import { useLocalStorage } from "@vueuse/core";
import CoursesService from "@/core/repositories/CoursesService";
import router from "@/router";
import {
  CourseSelection,
  GetPackagesResponseDto,
  PackageAddData,
  PackageFilter,
  PackageStatus,
  PackageUpdateData,
} from "@/types/Packages/Packages";
import PackagesService from "@/core/services/PackagesService";
import { PagedResult } from "@/types/ApiResponse";
import toaster from "@/core/services/Toaster";

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
    //// packages
    selectedCoursesForPackage: [] as CourseSelection[],
    coursesToSelectToAddToPackage: [] as CourseSelection[],
    packages: {} as PagedResult<GetPackagesResponseDto>,
    selectedPackage: useLocalStorage<Partial<GetPackagesResponseDto>>(
      "selectedPackage",
      {}
    ),
    selectedGradeId: useLocalStorage<string>("selectedGradeId", ""),
    selectedPackageState: PackageStatus.Active as PackageStatus,

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
        if (!this.selectedCourse.id??{}) {
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
    async loadCoursesToAddToPackage(courseName: string) {
      this.dataIsLoading = true
      const result = await PackagesService.getCoursesForPackageSelection(
        courseName,
        this.selectedGradeId
      );
      this.coursesToSelectToAddToPackage = result.data;
      this.dataIsLoading = false


    },
    async unselectCourseForPackage(id: string) {
      this.selectedCoursesForPackage = this.selectedCoursesForPackage.filter(
        (x) => x.id != id
      );
    },
    async createPackage(data: PackageAddData) {
      this.dataIsLoading = true;
      try {
        console.log(data);

        const formData = new FormData();
        for (let newKey in data) {
          console.log(newKey);
          if (!Array.isArray(data[newKey]))
            formData.append(
              newKey,
              data[newKey] as Blob
            );
          else {
            data[newKey].forEach((d) => {
              formData.append(newKey, d);
            });
          }
        }

        const result = await PackagesService.createPackage(formData);
        toaster.Success("created successfully");
        router.push({name:"ViewPackages"})
      } catch (error) {
        console.log(error);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async loadPackages(params: PackageFilter) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;
      try {
        const result = await PackagesService.getPackages(params);
        this.packages = result;
      } catch (e : any) {
        console.log((e as Error).message);
        this.packages = [];
      } finally {
        this.dataIsLoading = false;
      }
    },
    getPackageById(id: string) {
      return this.packages.results.find((x) => x.id == id);
    },
    selectPackage(packageRow: GetPackagesResponseDto) {
      this.selectedPackage = packageRow;
    },
    unSelectPackage(packageRow: GetPackagesResponseDto) {
      this.selectedPackage = null;
    },
    async updatePackage(packageUpdate: PackageUpdateData) {
      this.dataIsLoading = true;
      try {
        await PackagesService.updatePackage(packageUpdate);
        toaster.Success("updated successfully");
        router.push({name:"ViewPackages"})
      } catch (error) {
        console.log(error);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async deletePackage() {
      this.dataIsLoading = true;
      this.isDeletingItem = true;
      try {
        console.log("=============== in the module");
        console.log(this.selectedPackage);
        await PackagesService.deletePackage(this.selectedPackage?.id);
        toaster.Success("deleted successfully");
      } catch (error) {
        console.log(error);
      } finally {
        this.dataIsLoading = false;
        this.isDeletingItem = false;
      }
    },
    async removeCourseFromPackage(id: string) {
      try {
        const request = {
          packageId: this.selectedPackage.id,
          courseIds: [id],
        };

        await PackagesService.removeCourseFromPackage(request);
        this.selectedCoursesForPackage.filter((x) => x.id != id);

        toaster.Success("Course remvoed Successfully");

        await this.coursesStore.getCoursesByPackageId(this.selectedPackage);
        return true;
      } catch (error) {
        console.log(error);
      } finally {
      }
    },

    async addCourseToPackage(course: CourseSelection[]) {
      try {
        const request = {
          packageId: this.selectedPackage.id,
          courseIds: [...course.map((x) => x.id)],
        };

        console.log(request);

        await PackagesService.addCoursesToPackage(request);
        toaster.Success("Courses Added Successfully");

        await this.coursesStore.getCoursesByPackageId(this.selectedPackage);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async getCoursesByPackageId(selectedCourse: GetPackagesResponseDto) {
      try {
        const result = await PackagesService.getPackageById(selectedCourse);
        if (result.length > 0) this.selectPackage(result[0]);
        else this.selectPackage({});
      } catch (error) {
        console.log(error);
      }
    },
    async changePackageActiveState(packageId: string) {
      try {
        await PackagesService.changeActiveState(packageId);
        toaster.Success("state changed successfully");
      } catch (e) {
        console.log(e);
      }
    },
  },
});
