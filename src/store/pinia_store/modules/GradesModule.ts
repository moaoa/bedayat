import { defineStore } from "pinia";
import { Grade, NewGradeData } from "@/types/Grades";

import gradesService from "@/core/repositories/GradesService";

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
        console.log(error);
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
        console.log(error);
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedGrade) {
        console.error("no grade selected");
        return;
      }

      try {
        await gradesService.deleteGrade(this.selectedGrade.id);
        this.grades = this.grades.filter(
          (item) => item.id !== this.selectedGrade?.id
        );
        this.unselectGrade();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
