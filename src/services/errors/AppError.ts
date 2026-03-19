/**
 * Custom Application Error Classes
 * Following clean code principles for error handling
 */

/**
 * Base Application Error
 * All custom errors should extend this class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
    };
  }
}

/**
 * Network Error - For API/fetch failures
 */
export class NetworkError extends AppError {
  constructor(
    message: string = "Network request failed",
    statusCode: number = 0,
    public originalError?: Error
  ) {
    super(message, "NETWORK_ERROR", statusCode || 503);
    this.name = "NetworkError";
  }
}

/**
 * API Error - For server responses with error status codes
 */
export class ApiError extends AppError {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode?: string,
    public details?: unknown
  ) {
    super(message, "API_ERROR", statusCode);
    this.name = "ApiError";
  }
}

/**
 * Validation Error - For form/data validation failures
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields: Record<string, string> = {}
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

/**
 * Authentication Error - For auth-related failures
 */
export class AuthError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, "AUTH_ERROR", 401);
    this.name = "AuthError";
  }
}

/**
 * Not Found Error - For missing resources
 */
export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

/**
 * Timeout Error - For request timeouts
 */
export class TimeoutError extends AppError {
  constructor(message: string = "Request timeout") {
    super(message, "TIMEOUT_ERROR", 408);
    this.name = "TimeoutError";
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard to check if error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

/**
 * Type guard to check if error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Type guard to check if error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, "UNKNOWN_ERROR", 500);
  }

  if (typeof error === "string") {
    return new AppError(error, "UNKNOWN_ERROR", 500);
  }

  return new AppError("An unknown error occurred", "UNKNOWN_ERROR", 500);
}
