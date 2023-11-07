import { AppConstants } from "@/core/constants/ApplicationsConstants";
import {
  boolean,
  nullable,
  number,
  object,
  string,
  Output,
  unknown,
  array,
} from "valibot";

export const UserSchema = object({
  role: number(),
  code: nullable(string()),
  firstName: string(),
  fatherName: string(),
  surName: string(),
  motherName: string(),
  otherPhone: nullable(string()),
  fullName: string(),
  permissions: array(number()),
  avatar: nullable(string()),
  nationalNumber: string(),
  isAccepted: boolean(),
  isDisabled: boolean(),
  countryId: string(),
  cityId: string(),
  localityId: string(),
  address: string(),
  birthDate: string(),
  gender: number(),
  faceBookId: nullable(string()),
  walletId: string(),
  isCompleteProfile: boolean(),
  children: unknown(),
  id: string(),
  createdAt: string(),
  lastUpdated: string(),
  isAdmin: boolean(),
  schoolManager: boolean(),
  academicQualification: nullable(string()),
  qualificationDate: nullable(string()),
  teacherType: number(),
  resume: nullable(string()),
  isTeacher: boolean(),
  occupation: string(),
  isParent: boolean(),
  parents: unknown(),
  parentId: nullable(string()),
  gradeId: nullable(string()),
  isActivated: boolean(),
  isChild: boolean(),
});

export type User = Output<typeof UserSchema>;

export const ResponseSchema = object({
  results: nullable(array(UserSchema)),
  statusCode: number(),
  isSuccess: boolean(),
  message: nullable(string()),
  pageNumber: number(),
  pageSize: number(),
  pageItemsCount: number(),
  rowsCount: number(),
  hasPrevious: boolean(),
  hasNext: boolean(),
  pagesCount: number(),
});

export type Response = Output<typeof ResponseSchema>;

export type NewUserData = {
  email: string;
  password: string;
  permissions: number[];
  firstName: string;
  fatherName: string;
  surName: string;
  phone: string;
  otherPhone: string | null;
  gender: number;
};

export type Role = typeof AppConstants.USER_ROLES;

export type RoleValues = Role[keyof Role];

export type PermissionActions = typeof AppConstants.PERMISSION_ACTIONS;
export type PermissionActionsValues =
  PermissionActions[keyof PermissionActions];

export type FilterByOptions = typeof AppConstants.FILTER_ADMIN_BY_OPTIONS;

export type FilterByOptionsValues = FilterByOptions[keyof FilterByOptions];
