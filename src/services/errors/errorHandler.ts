/**
 * Global Error Handler
 * Centralized error handling and logging
 */

import { AppError, toAppError, isAppError } from "./AppError";

/**
 * Error Log Levels
 */
export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

/**
 * Error Log Entry
 */
interface ErrorLog {
  timestamp: string;
  level: LogLevel;
  error: AppError;
  context?: Record<string, unknown>;
  userAgent?: string;
  url?: string;
}

/**
 * Error Logger Class
 */
class ErrorLogger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log error with context
   */
  log(error: unknown, context?: Record<string, unknown>): void {
    const appError = toAppError(error);
    const logEntry: ErrorLog = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      error: appError,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In development, log to console with full details
    if (this.isDevelopment) {
      console.error("❌ Error logged:", {
        ...logEntry,
        stack: appError.stack,
      });
    }

    // In production, send to error tracking service
    if (!this.isDevelopment) {
      this.sendToErrorTracking(logEntry);
    }

    // Store in localStorage for debugging
    this.storeErrorLog(logEntry);
  }

  /**
   * Log warning
   */
  warn(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.warn("⚠️ Warning:", message, context);
    }
  }

  /**
   * Log info
   */
  info(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.info("ℹ️ Info:", message, context);
    }
  }

  /**
   * Send error to tracking service (e.g., Sentry, LogRocket)
   * TODO: Integrate with actual error tracking service
   */
  private sendToErrorTracking(logEntry: ErrorLog): void {
    // Placeholder for error tracking integration
    // Example: Sentry.captureException(logEntry.error);

    // For now, just log to console in production
    console.error("Error Tracking:", logEntry);
  }

  /**
   * Store error log in localStorage
   */
  private storeErrorLog(logEntry: ErrorLog): void {
    try {
      const maxLogs = 50;
      const key = "error_logs";
      const existingLogs = JSON.parse(
        localStorage.getItem(key) || "[]"
      ) as ErrorLog[];

      existingLogs.push(logEntry);

      // Keep only the most recent logs
      if (existingLogs.length > maxLogs) {
        existingLogs.splice(0, existingLogs.length - maxLogs);
      }

      localStorage.setItem(key, JSON.stringify(existingLogs));
    } catch (error) {
      // Silent fail if localStorage is unavailable
      console.warn("Failed to store error log:", error);
    }
  }

  /**
   * Get stored error logs
   */
  getErrorLogs(): ErrorLog[] {
    try {
      const key = "error_logs";
      const logs = JSON.parse(localStorage.getItem(key) || "[]") as ErrorLog[];
      return logs;
    } catch {
      return [];
    }
  }

  /**
   * Clear error logs
   */
  clearErrorLogs(): void {
    try {
      localStorage.removeItem("error_logs");
    } catch {
      // Silent fail
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: unknown): string {
    const appError = toAppError(error);

    // Return user-friendly messages based on error type
    if (appError.code === "NETWORK_ERROR") {
      return "Unable to connect. Please check your internet connection.";
    }

    if (appError.code === "VALIDATION_ERROR") {
      return appError.message || "Please check your input and try again.";
    }

    if (appError.code === "AUTH_ERROR") {
      return "Please log in to continue.";
    }

    if (appError.code === "NOT_FOUND") {
      return appError.message || "The requested resource was not found.";
    }

    if (appError.code === "TIMEOUT_ERROR") {
      return "Request timed out. Please try again.";
    }

    // Default message
    if (appError.statusCode >= 500) {
      return "Something went wrong on our end. Please try again later.";
    }

    if (appError.statusCode >= 400) {
      return "Unable to complete your request. Please try again.";
    }

    return "An unexpected error occurred. Please try again.";
  }
}

// Export singleton instance
export const errorHandler = new ErrorLogger();

/**
 * Global error handler utility
 */
export function handleError(error: unknown, context?: Record<string, unknown>): void {
  errorHandler.log(error, context);
}

/**
 * Get user-friendly error message
 */
export function getUserErrorMessage(error: unknown): string {
  return errorHandler.getUserMessage(error);
}

/**
 * Create error handler function for React Query
 */
export function createQueryErrorHandler(
  context?: string
): (error: unknown) => void {
  return (error: unknown) => {
    handleError(error, { query: context });
  };
}
