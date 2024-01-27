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

export const AvatarSchema = object({
  id: string(),
  roleType: number(),
  avatarPath: string(),
});

export type Avatar = Output<typeof AvatarSchema>;

export const ResponseSchema = object({
  data: nullable(array(AvatarSchema)),
  statusCode: number(),
  isSuccess: boolean(),
  message: nullable(string()),
  // pageNumber: number(),
  // pageSize: number(),
  // pageItemsCount: number(),
  // rowsCount: number(),
  // hasPrevious: boolean(),
  // hasNext: boolean(),
  // pagesCount: number(),
});
export const FamilyResponseSchema = object({
  data: nullable(array(AvatarSchema)),
  statusCode: number(),
  isSuccess: boolean(),
  message: nullable(string()),
});

export type Response = Output<typeof ResponseSchema>;
export type FamilyResponse = Output<typeof FamilyResponseSchema>;

export type NewAvatarData = {
  roleType: number;
  avatarPath: Blob;
};

export type Role = typeof AppConstants.USER_ROLES;

export type RoleValues = Role[keyof Role];

export type PermissionActions = typeof AppConstants.PERMISSION_ACTIONS;
export type PermissionActionsValues =
  PermissionActions[keyof PermissionActions];

export type FilterByOptions = typeof AppConstants.FILTER_ADMIN_BY_OPTIONS;

export type FilterByOptionsValues = FilterByOptions[keyof FilterByOptions];
