export type IssueStatus = "Pending" | "Solved";
export type BugReport = {
  id: string;
  title: string;
  description: string;
  attachments: string[];
  bugResponse: string;
  issueStatus: IssueStatus;
};

export enum IssueStatusValues {
  Pending = "Pending",
  Solved = "Solved",
}
