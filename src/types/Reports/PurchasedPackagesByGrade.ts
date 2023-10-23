
import {
  string,
  number,
  object,
  nullable,
  array,
  boolean,
  Output,
// @ts-ignore
} from "valibot";

export const PurchasedPackageByGradeSchema = object({
  packageId: string(),
  title: string(),
  englishTitle: string(),
  gradeId: string(),
  subjectId: string(),
  userId: string(),
  userName: string(),
  price: number(),
  logoPath: string(),
  numberOfPurchases: number(),
  purchasedAt: string(),
  sumOfPrice: number(),
  totalOfPurchases: number(),
});

export type PurchasedPackageByGrade = Output<
  typeof PurchasedPackageByGradeSchema
>;

export const ResponseSchema = object({
  results: nullable(array(PurchasedPackageByGradeSchema)),
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

export type PurchasedPackageByGradeFilters = {
  gradeId: string;
  checkExpiryDate: boolean;
  packageType: number;
  fromDate: string | null;
  toDate: string | null;
  pageNumber: number;
  pageSize: number;

};
