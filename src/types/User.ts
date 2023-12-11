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
  nullType,
} from "valibot";

export const UserSchema = object({
  id: string(),
  role: number(),
  firstName: string(),
  fatherName: nullable(string()),
  email: string(),
  surName: string(),
  phoneNumber: nullable(string()),
  otherPhone: nullable(string()),
  isDisabled: boolean(),
  fullName: nullable(string()),
  permissions: array(unknown()),
  avatar: nullable(string()),
  localityId: string(),
  address: nullable(string()),
  birthDate: nullable(string()),
  gender: number(),
  createdAt: string(),
  lastUpdated: string(),
  isAdmin: boolean(),
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
export const FamilyResponseSchema = object({
  data: nullable(array(UserSchema)),
  statusCode: number(),
  isSuccess: boolean(),
  message: nullable(string()),
});

export type Response = Output<typeof ResponseSchema>;
export type FamilyResponse = Output<typeof FamilyResponseSchema>;

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
