/**
 * HTTP Client
 * Centralized HTTP client with error handling, interceptors, and TypeScript support
 * Following industry best practices for API abstraction
 */

import { ApiError, NetworkError, TimeoutError, errorHandler } from "../errors";

/**
 * HTTP Request Configuration
 */
interface HttpRequestConfig {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * HTTP Response
 */
interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * HTTP Client Class
 */
class HttpClient {
  private baseURL: string;
  private defaultTimeout: number = 10000; // 10 seconds
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = "/api") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Set default header
   */
  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  /**
   * Remove default header
   */
  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  /**
   * Set auth token
   */
  setAuthToken(token: string): void {
    this.setDefaultHeader("Authorization", `Bearer ${token}`);
  }

  /**
   * Remove auth token
   */
  removeAuthToken(): void {
    this.removeDefaultHeader("Authorization");
  }

  /**
   * Build full URL
   */
  private buildURL(endpoint: string): string {
    // If endpoint is already a full URL, return as is
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
      return endpoint;
    }

    // Remove leading slash from baseURL if present
    const base = this.baseURL.replace(/\/$/, "");
    // Remove leading slash from endpoint if present
    const path = endpoint.replace(/^\//, "");

    return `${base}/${path}`;
  }

  /**
   * Create AbortController with timeout
   */
  private createTimeoutController(timeout?: number): AbortController {
    const controller = new AbortController();
    const timeoutMs = timeout || this.defaultTimeout;

    setTimeout(() => controller.abort(), timeoutMs);

    return controller;
  }

  /**
   * Handle fetch errors
   */
  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: T;
    if (isJson) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    // Handle error responses
    if (!response.ok) {
      const errorMessage =
        (data as { message?: string })?.message ||
        response.statusText ||
        "Request failed";

      throw new ApiError(
        errorMessage,
        response.status,
        (data as { code?: string })?.code,
        data
      );
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    config: HttpRequestConfig = {}
  ): Promise<HttpResponse<T>> {
    const {
      method = "GET",
      headers = {},
      body,
      timeout,
      signal: externalSignal,
    } = config;

    const url = this.buildURL(endpoint);
    const controller = this.createTimeoutController(timeout);

    // Combine external signal with timeout signal
    const combinedSignal = externalSignal
      ? this.combineSignals([controller.signal, externalSignal])
      : controller.signal;

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
      signal: combinedSignal,
    };

    // Add body for methods that support it
    if (body && method !== "GET" && method !== "HEAD") {
      requestInit.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestInit);
      return await this.handleResponse<T>(response);
    } catch (error) {
      // Handle abort/timeout
      if (error instanceof Error && error.name === "AbortError") {
        throw new TimeoutError(`Request timeout: ${method} ${url}`);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new NetworkError(
          "Network request failed. Please check your connection.",
          0,
          error
        );
      }

      // Re-throw known errors
      if (error instanceof ApiError) {
        throw error;
      }

      // Log and throw unknown errors
      errorHandler.log(error, { url, method });
      throw new NetworkError(
        "An unexpected error occurred",
        0,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Combine multiple AbortSignals
   */
  private combineSignals(signals: AbortSignal[]): AbortSignal {
    const controller = new AbortController();

    for (const signal of signals) {
      signal.addEventListener("abort", () => controller.abort());
    }

    return controller.signal;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: Omit<HttpRequestConfig, "method" | "body">): Promise<T> {
    const response = await this.request<T>(endpoint, { ...config, method: "GET" });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, "method">
  ): Promise<T> {
    const response = await this.request<T>(endpoint, { ...config, method: "POST", body });
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, "method">
  ): Promise<T> {
    const response = await this.request<T>(endpoint, { ...config, method: "PUT", body });
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, "method">
  ): Promise<T> {
    const response = await this.request<T>(endpoint, { ...config, method: "PATCH", body });
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: Omit<HttpRequestConfig, "method" | "body">): Promise<T> {
    const response = await this.request<T>(endpoint, { ...config, method: "DELETE" });
    return response.data;
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();

// Export class for testing
export { HttpClient };
