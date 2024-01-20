import {
  string,
  number,
  object,
  nullable,
  array,
  boolean,
  Output,
  any,
  unknown,
} from "valibot";
export type ApiResponse<T> = {
  data: T;
  message?: string;
  statusCode: string;
  isSuccess: boolean;
};

export const BaseResponseSchema = object({
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

export type PagedList<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export interface PagedResult<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  pageItemsCount: number;
  rowsCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  pagesCount: number;
}
