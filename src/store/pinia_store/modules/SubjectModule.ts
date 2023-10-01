import { defineStore } from "pinia";
import { Subject, NewSubjectData } from "@/types/Subjects";

import subjectsService from "@/core/repositories/SubjectsService";

export const useSubjectsStore = defineStore({
  id: "subjectsStore",
  state: () => ({
    subjects: [] as Subject[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
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
    async loadSubjects() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        console.log("getting subjects ")
        const items = await subjectsService.getSubjects();
        console.log(items)
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
