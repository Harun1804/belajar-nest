import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

// Handlers may return raw data, or { message, data } to customize the message
type HandlerResult<T> = T | { message: string; data: T };

function hasCustomMessage<T>(
  result: HandlerResult<T>,
): result is { message: string; data: T } {
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
