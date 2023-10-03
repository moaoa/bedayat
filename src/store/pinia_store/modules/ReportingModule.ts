import { defineStore } from "pinia";
import {Subject, NewSubjectData, SubjectType} from "@/types/Subjects";

import subjectsService from "@/core/repositories/SubjectsService";

export const useSubjectsStore = defineStore({
  id: "subjectsStore",
  state: () => ({
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    selectedSubjectType: 0 as number,
    dataIsLoading: false,
    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadMostPurchasedCourses() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;
      try {

      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
