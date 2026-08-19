export interface PaginationMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalData: number;
}

export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
}
