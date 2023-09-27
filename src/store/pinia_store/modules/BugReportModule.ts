import {defineStore} from "pinia";

import type {BugReport, IssueStatus} from "@/types/BugReports";
import {BugStatusSearch, IssueStatusValues} from "@/types/BugReports";
import BugReportService from "@/core/services/BugReportService";
import Toaster from "@/core/services/Toaster";

export const useBugReportsStore = defineStore({
    id: "bugReportsStore",

    state: () => ({
        bugReports: [
            // {
            //   id: "1",
            //   attachments: [
            //     "/media/stock/300x270/9.jpg",
            //     "/media/stock/300x270/7.jpg",
            //   ],
            //   bugResponse: "",
            //   description: "description 1",
            //   issueStatus: "Pending",
            //   title: "title 1",
            // },
            // {
            //   id: "2",
            //   attachments: [],
            //   bugResponse: "",
            //   description: "description 2",
            //   issueStatus: "Pending",
            //   title: "title 2",
            // },
        ] as BugReport[],
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
                const result = await BugReportService.getBugReports(this.selectedBugCategory);

                this.bugReports = result.data;

            } catch (error) {
                Toaster.error(error.message)
            } finally {

                this.dataIsLoading = false;
            }
        },
        selectBugReportId(bugId: string) {
            this.selectedBugId = bugId;
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
