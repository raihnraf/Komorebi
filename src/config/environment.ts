/**
 * Environment Configuration
 * Type-safe environment variables
 */

/**
 * Application Environment
 */
type Environment = "development" | "production" | "test";

/**
 * Environment Configuration
 */
export const config = {
  /**
   * Get environment variable with type safety
   */
  getEnv: (key: string, defaultValue?: string): string => {
    const value = import.meta.env[key];
    if (value === undefined && defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value || defaultValue || "";
  },

  /**
   * API Configuration
   */
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  },

  /**
   * Application Configuration
   */
  app: {
    name: "Sakura & Matcha",
    version: "1.0.0",
    environment: (import.meta.env.VITE_APP_ENV || "development") as Environment,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },

  /**
   * Feature Flags
   */
  features: {
    enableAuth: import.meta.env.VITE_ENABLE_AUTH === "true",
    enableReview: import.meta.env.VITE_ENABLE_REVIEW !== "false", // default true
    enableErrorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === "true",
  },

  /**
   * Error Tracking
   */
  errorTracking: {
    sentryDSN: import.meta.env.VITE_SENTRY_DSN || "",
    enabled: import.meta.env.VITE_ENABLE_ERROR_TRACKING === "true",
  },
} as const;

/**
 * Validate required environment variables
 */
export function validateConfig(): void {
  const required: string[] = [];

  // Check required variables in production
  if (config.app.isProduction) {
    // Add production-required variables here
    // if (!config.api.baseURL) required.push("VITE_API_BASE_URL");
  }

  if (required.length > 0) {
    throw new Error(`Missing required environment variables: ${required.join(", ")}`);
  }
}

// Validate config on import
if (config.app.isProduction) {
  validateConfig();
}
