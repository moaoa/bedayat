import { defineStore } from "pinia";

import type { BugReport, IssueStatus } from "@/types/BugReports";
import { IssueStatusValues } from "@/types/BugReports";

export const useBugReportsStore = defineStore({
  id: "bugReportsStore",

  state: () => ({
    bugReports: [
      {
        id: "1",
        attachments: [
          "/media/stock/300x270/9.jpg",
          "/media/stock/300x270/7.jpg",
        ],
        bugResponse: "",
        description: "description 1",
        issueStatus: "Pending",
        title: "title 1",
      },
      {
        id: "2",
        attachments: [],
        bugResponse: "",
        description: "description 2",
        issueStatus: "Pending",
        title: "title 2",
      },
    ] as BugReport[],
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
    selectBugReportId(bugId: string) {
      this.selectedBugId = bugId;
    },
    async respondToSelectedBug(message: string) {
      if (!this.selectedBugId) {
        return;
      }
      //TODO: hit the backend
      this.bugReports.find(
        (bug) => bug.id === this.selectedBugId
      )!.bugResponse = message;

      this.closeBugReport(this.selectedBugId);

      return true;
    },
    closeBugReport(bugId: string) {
      if (!bugId) return;

      this.bugReports.find((bug) => bug.id === bugId)!.issueStatus = "Solved";
    },
  },
});
