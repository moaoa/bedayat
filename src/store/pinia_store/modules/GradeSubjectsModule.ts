import { defineStore } from "pinia";
import { Grade, NewGradeData } from "@/types/Grades";
import gradesService from "@/core/repositories/GradesService";
import { GradeSubject, NewGradeSubjectData } from "@/types/GradeSubjects";
import { Subject } from "@/types/Subjects";
import gradeSubjectsService from "@/core/repositories/GradeSubjectsService";
import GradeSubjectsService from "@/core/repositories/GradeSubjectsService";
import Toaster from "@/core/services/Toaster";
import toaster from "@/core/services/Toaster";
import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;
export const useGradeSubjectsStore = defineStore({
  id: "gradeSubjectsStore",
  state: () => ({
    gradeSubjects: [] as GradeSubject[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    searchValue: "",
    selectedGradeId: "",
    isSwitchingGradeStatus: false,
    selectedGradeSubject: null as GradeSubject | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,
    errorMessage: "",
    errorLoadingData: false,
  }),
  actions: {
    async loadGradeSubjects(loadingIndicator : boolean = true) {
      this.dataIsLoading = loadingIndicator;
      this.errorLoadingData = false;

      try {
        const items = await gradeSubjectsService.getGradeSubjectByGradeId(
          this.selectedGradeId
        );

        this.gradeSubjects = items.data.data;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectGradeSubject() {
      this.selectedGradeSubject = null;
    },
    clearGradeSubjects() {
      this.gradeSubjects = [];
    },
    selectGradeSubject(selectedGrade: GradeSubject) {
      this.selectedGradeSubject = selectedGrade;
    },
    async updateItem(newGradeSubjectData: NewGradeSubjectData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedGradeSubject) {
          throw Error("no selected grade");
        }

        const index = this.gradeSubjects.findIndex(
          (grade) => grade.id === this.selectedGradeSubject!.id
        );
        console.log("updating");
        await gradeSubjectsService.update(
          this.selectedGradeSubject.id,
            newGradeSubjectData
        );

        toaster.Success("item updated")

        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log((error as Error).message);
      }
    },
    async createNewItem(newGradeSubjectData: NewGradeSubjectData) {
      this.isCreatingNewItem = true;
      try {

        await GradeSubjectsService.create(newGradeSubjectData);

        Toaster.Success(t("success"), t("createdNewItem"));
      } catch (error) {
        console.log(error);
      }finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedGradeSubject) {
        console.error("no grade selected");
        return;
      }

      try {
        await gradeSubjectsService.delete(this.selectedGradeSubject.id);
        this.gradeSubjects = this.gradeSubjects.filter(
          (item) => item.id !== this.selectedGradeSubject?.id
        );
        this.unselectGradeSubject();
        toaster.Success("item deleted")
      } catch (error) {
        console.log(error);

        toaster.error((error as Error).message)
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
