
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

export const PurchasedPackageWithCountSchema = object({
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

export type PurchasedPackageWithCount = Output<
  typeof PurchasedPackageWithCountSchema
>;

export const ResponseSchema = object({
  results: nullable(array(PurchasedPackageWithCountSchema)),
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

export type PurchasedPackageWithCountFilters = {
  orderByMostPurchased: boolean;
  packageType: number;
  fromDate: string | null;
  toDate: string | null;
  pageNumber: number;
  pageSize: number;

};
