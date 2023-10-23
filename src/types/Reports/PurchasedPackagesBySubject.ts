import {
  string,
  number,
  object,
  nullable,
  array,
  boolean,
  Output,
} from "valibot";

export const PurchasedPackageBySubjectSchema = object({
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

export type PurchasedPackageBySubject = Output<
  typeof PurchasedPackageBySubjectSchema
>;

export const ResponseSchema = object({
  results: nullable(array(PurchasedPackageBySubjectSchema)),
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
  subjectId: string | null;
  packageType: number;
  checkExpiryDate: boolean;
  fromDate: string | null;
  toDate: string | null;
  pageNumber: number;
  pageSize: number;
};
