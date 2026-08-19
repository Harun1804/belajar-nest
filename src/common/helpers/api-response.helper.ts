// Shorthand for controllers to return a message + data pair the ApiResponseInterceptor understands
export function apiResponse<T = null>(message: string, data: T = null as T) {
  return { message, data };
}
