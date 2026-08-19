import { PaginationMeta } from '../interfaces/api-response.interface';

// Shorthand for controllers to return a message + data (+ optional pagination) pair the ApiResponseInterceptor understands
export function apiResponse<T = null>(
  message: string,
  data: T = null as T,
  pagination?: PaginationMeta,
) {
  return { message, data, pagination };
}
