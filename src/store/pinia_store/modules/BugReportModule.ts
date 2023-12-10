import {defineStore} from "pinia";

import type {BugReport} from "@/types/BugReports";
import {BugDepartmentType, BugStatusSearch} from "@/types/BugReports";
import BugReportService from "@/core/services/BugReportService";
import Toaster from "@/core/services/Toaster";

import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;
export const useBugReportsStore = defineStore({
    id: "bugReportsStore",

    state: () => ({
        bugReports: [

        ] as BugReport[],
        pagination: {
            total: 0,
            currentPage: 1,
            currentSize: 10,
        },
        selectedBugToRespond: {} as BugReport,
        dataIsLoading: false,
        selectedBugCategory: -1 as BugStatusSearch,
        selectedBugId: null as string | null,
    }),
    getters: {
        responseOfSelectedBug(state) {
            if (!state.selectedBugId) return "";

            return state.bugReports.find((bug) => bug.id === this.selectedBugId)!
                .bugResponse;
        },
    },
    actions: {
        async loadBugReports() {
            try {
                this.dataIsLoading = true;
                const result = await BugReportService.getBugReports(this.selectedBugCategory, this.pagination.currentPage, this.pagination.currentSize);

                this.bugReports = result.results;
                this.pagination.total = result.rowsCount;
              } catch (error) {
                Toaster.error(error.message)
            } finally {

                this.dataIsLoading = false;
            }
        },
        selectBugReportId(bugId: string) {
            this.selectedBugId = bugId;
        },
        async assignDepartment(id: string, category: BugDepartmentType) {

            try {
                await BugReportService.assignBugToDifferentDepartment(id, category);
                this.bugReports.find(x => x.id == id)!.department = category;

                await this.loadBugReports();

                Toaster.Success(t("success"));
            } catch (error) {

                Toaster.error(error.message)
            }

        },


        async respondToSelectedBug(message: string) {
            try {

                this.dataIsLoading = true;

                if (!this.selectedBugId) {
                    return;
                }
                const result = BugReportService.respondToBugReport(this.selectedBugId, message)

                this.bugReports.find(
                    (bug) => bug.id === this.selectedBugId
                )!.bugResponse = message;

                this.closeBugReport(this.selectedBugId);

                return true;
            } catch (error) {

                Toaster.error(error.message)
            } finally {

                this.dataIsLoading = false;
            }

        },
        closeBugReport(bugId: string) {
            if (!bugId) return;

            this.bugReports.find((bug) => bug.id === bugId)!.issueStatus = "Solved";
        },
    },
});
