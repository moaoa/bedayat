import { defineStore } from "pinia";
import { Subject, NewSubjectData, SubjectType } from "@/types/Subjects";

import subjectsService from "@/core/repositories/SubjectsService";
import Toaster from "@/core/services/Toaster";
import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;

export const useSubjectsStore = defineStore({
  id: "subjectsStore",
  state: () => ({
    subjects: [] as Subject[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    selectedSubjectType: 0 as number,
    searchValue: "",

    isSwitchingSubjectStatus: false,

    selectedSubject: null as Subject | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadSubjects(allSubjects: boolean = false) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await subjectsService.getSubjects(
          allSubjects ? null : this.selectedSubjectType
        );
        this.subjects = items;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectSubject() {
      this.selectedSubject = null;
    },
    selectSubject(selectedSubject: Subject) {
      this.selectedSubject = selectedSubject;
    },
    async updateItem(newValues: NewSubjectData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedSubject) {
          throw Error("no selected subject");
        }

        const index = this.subjects.findIndex(
          (subject) => subject.id === this.selectedSubject!.id
        );

        await subjectsService.updateSubject(this.selectedSubject.id, newValues);

        Toaster.Success(t("success"), t("updatedSuccessfully"));

        this.subjects[index] = { ...this.selectedSubject, ...newValues };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(subjectData: NewSubjectData) {
      this.isCreatingNewItem = true;
      try {
        const res = await subjectsService.createSubject(subjectData);
        this.subjects.push(res.data.data);
        this.isCreatingNewItem = false;
        Toaster.Success(t("success"), t("createdSuccessfully"));
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedSubject) {
        console.error("no subject selected");
        return;
      }

      try {
        await subjectsService.deleteSubject(this.selectedSubject.id);
        this.subjects = this.subjects.filter(
          (item) => item.id !== this.selectedSubject?.id
        );
        this.unselectSubject();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
