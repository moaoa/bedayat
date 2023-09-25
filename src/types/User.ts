import { AppConstants } from "@/core/constants/ApplicationsConstants";

export type User = {
  role: number;
  code: unknown;
  firstName: string;
  fatherName: string;
  surName: string;
  motherName: string;
  otherPhone: string;
  fullName: string;
  permissions: number[];
  avatar: unknown;
  nationalNumber: string;
  isAccepted: boolean;
  isDisabled: boolean;
  countryId: string;
  cityId: string;
  localityId: string;
  address: string;
  birthDate: string;
  gender: number;
  faceBookId: unknown;
  walletId: string;
  isCompleteProfile: boolean;
  children: User[];
  id: string;
  createdAt: string;
  lastUpdated: string;
  isAdmin: boolean;
  schoolManager: boolean;
  academicQualification: unknown;
  qualificationDate: unknown;
  teacherType: number;
  resume: unknown;
  isTeacher: boolean;
  occupation: string;
  isParent: boolean;
  parents: User[];
  parentId: unknown;
  gradeId: unknown;
  isActivated: boolean;
  isChild: boolean;
};

export type NewUserData = {
  email: string;
  password: string;
  permissions: number[];
  firstName: string;
  fatherName: string;
  surName: string;
  phoneNumber: string;
  otherPhone: string;
  gender: number;
};

export type Role = typeof AppConstants.USER_ROLES;

export type RoleValues = Role[keyof Role];

export type PermissionActions = typeof AppConstants.PERMISSION_ACTIONS;
export type PermissionActionsValues =
  PermissionActions[keyof PermissionActions];

export type FilterByOptions = typeof AppConstants.FILTER_ADMIN_BY_OPTIONS;

export type FilterByOptionsValues = FilterByOptions[keyof FilterByOptions];
