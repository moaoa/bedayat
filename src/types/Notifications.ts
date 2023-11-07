import {
  boolean,
  nullable,
  number,
  object,
  string,
  Output,
  array,
} from "valibot";

export const UserForNotificationSchema = object({
  userId: string(),
  fullName: string(),
  roleType: number(),
  phoneNumber: string(),
  email: string(),
});

export type User = Output<typeof UserForNotificationSchema>;

export const ResponseSchema = object({
  data: nullable(array(UserForNotificationSchema)),
  statusCode: string(),
  isSuccess: boolean(),
  message: nullable(string()),
  traceId: nullable(string()),
});

export type Response = Output<typeof ResponseSchema>;

export type NewNotificationPayload = {
  title: string;
  englishTitle: string;
  description: string;
  englishDescription: string;
  level: number;
  users: string[];
  notificationFor: number;
  notificationType: number;
  image: File;
};

export type NotificationFilters = {
  notificationTarget: number;
  searchContent: string;
  roleType: number;
  countryId: string;
  cityId: string;
  localityId: string;
  packageId: string;
};

export type NotificationForm = {
  description: string;
  englishDescription: string;
  englishTitle: string;
  image: null | File;
  level: number;
  notificationFor: number;
  notificationType: number;
  title: string;
};
