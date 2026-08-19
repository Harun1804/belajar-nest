import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ApiResponse,
  PaginationMeta,
} from '../interfaces/api-response.interface';

// Handlers may return raw data, or { message, data, pagination? } to customize the message/add pagination
type HandlerResult<T> =
  T | { message: string; data: T; pagination?: PaginationMeta };

function hasCustomMessage<T>(
  result: HandlerResult<T>,
): result is { message: string; data: T; pagination?: PaginationMeta } {
  return (
    typeof result === 'object' &&
    result !== null &&
    'message' in result &&
    'data' in result
  );
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result: HandlerResult<T>) => {
        if (hasCustomMessage(result)) {
          return {
            status: true,
            message: result.message,
            data: result.data,
            ...(result.pagination ? { pagination: result.pagination } : {}),
          };
        }

        return {
          status: true,
          message: 'Request successful',
          data: result,
        };
      }),
    );
  }
}
