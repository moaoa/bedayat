import {
  string,
  number,
  object,
  nullable,
  array,
  boolean,
  Output,
} from "valibot";

export const PurchasedPackageByUserSchema = object({
  packageId: string(),
  title: string(),
  englishTitle: string(),
  gradeId: string(),
  subjectId: string(),
  userId: string(),
  userName: string(),
  price: number(),
  logoPath: nullable(string()),
  numberOfPurchases: number(),
  purchasedAt: string(),
  sumOfPrice: number(),
  totalOfPurchases: number(),
});

export type PurchasedPackageBySpecificUser = Output<
  typeof PurchasedPackageByUserSchema
>;

export const ResponseSchema = object({
  results: nullable(array(PurchasedPackageByUserSchema)),
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

export type Filters = {
  userId: string | null;
  pageNumber: number;
  pageSize: number;
};
