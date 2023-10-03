export type IssueStatus = "Pending" | "Solved";
export type BugReport = {
  id: string;
  title: string;
  description: string;
  attachments: string[];
  bugResponse: string;
  department: BugDepartmentType;
  issueStatus: IssueStatus;
};
export enum BugStatusSearch {
  Pending,
  Solved ,
  All,
}


export enum BugDepartmentType
{
  Technical = 0,
  Support,
  Financial,
  Admin
}


export enum IssueStatusValues {
  Pending = "Pending",
  Solved = "Solved",
}
