import { defineStore } from "pinia";
import { Grade, NewGradeData } from "@/types/Grades";

import { AppConstants } from "@/core/constants/ApplicationsConstants";
import gradesService from "@/core/repositories/GradesService";
import Toaster from "@/core/services/Toaster";

export const useGradesStore = defineStore({
  id: "gradesStore",
  state: () => ({
    grades: [] as Grade[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    searchValue: "",

    isSwitchingGradeStatus: false,

    selectedGrade: null as Grade | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadGrades() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await gradesService.getGrades();

        this.grades = items;
      } catch (e) {
        console.log((e as Error).message);
        Toaster.error((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectGrade() {
      this.selectedGrade = null;
    },
    selectGrade(selectedGrade: Grade) {
      this.selectedGrade = selectedGrade;
    },
    async updateItem(newValues: NewGradeData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedGrade) {
          throw Error("no selected grade");
        }

        const index = this.grades.findIndex(
          (grade) => grade.id === this.selectedGrade!.id
        );

        await gradesService.updateGrade(this.selectedGrade.id, newValues);

        this.grades[index] = { ...this.selectedGrade, ...newValues };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        throw error;
      }
    },
    async createNewItem(gradeData: NewGradeData) {
      this.isCreatingNewItem = true;
      try {
        const res = await gradesService.createGrade(gradeData);
        this.grades.push(res.data.data);
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        throw error;
      }
    },
  },
});
