import { defineStore } from "pinia";
import { Grade, NewGradeData } from "@/types/Grades";

import gradesService from "@/core/repositories/GradesService";
import {GradeSubject, NewGradeSubjectData} from "@/types/GradeSubjects";
import {Subject} from "@/types/Subjects";
import gradeSubjectsService from "@/core/repositories/GradeSubjectsService";
import GradeSubjectsService from "@/core/repositories/GradeSubjectsService";

export const useGradeSubjectsStore = defineStore({
  id: "gradeSubjectsStore",
  state: () => ({
    gradeSubjects: [
      {
        id: '1324124',
        subject:{} as Subject,
        subjectId: 'string',
        grade: {} as Grade,
        gradeId: 'string',
        bookLink: "string",
        logo: "logoPath",
        createdAt: new Date().toDateString(),
        lastUpdated:  new Date().toDateString(),
      },
    ] as GradeSubject[],
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
    async loadGradeSubjects() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await gradeSubjectsService.getGradeSubjectByGradeId(this.selectedGradeId);

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

        const formData = new FormData();
        for (let newGradeSubjectDataKey in newGradeSubjectData) {
          formData.append(newGradeSubjectDataKey,  newGradeSubjectData[newGradeSubjectDataKey] as Blob);
        }

        console.log("updating")
        await gradeSubjectsService.update(this.selectedGradeSubject.id, formData);

        await this.loadGradeSubjects();

        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(newGradeSubjectData: NewGradeSubjectData) {
      this.isCreatingNewItem = true;
      try {

        const formData = new FormData();
        for (let newGradeSubjectDataKey in newGradeSubjectData) {
          formData.append(newGradeSubjectDataKey,  newGradeSubjectData[newGradeSubjectDataKey] as Blob);
        }

        formData.append('chaptersCount', '1');

        await GradeSubjectsService.create(formData)

        await this.loadGradeSubjects();
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
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
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
