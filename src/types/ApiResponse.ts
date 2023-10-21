export type ApiResponse<T> = {
  data: T;
  message?: string;
  statusCode: string;
  isSuccess: boolean;
};

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
  results: T[];
  pageNumber: number;
  pageSize: number;
  pageItemsCount: number;
  rowsCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  pagesCount: number;
}
