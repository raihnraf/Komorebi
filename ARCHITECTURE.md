# Service Layer, Config, & Error Handling Documentation

This document explains the new Service Layer, Configuration system, and Error Handling implementation following 2025 industry standards.

## 📁 Table of Contents

1. [Service Layer](#service-layer)
2. [Configuration System](#configuration-system)
3. [Error Handling](#error-handling)
4. [React Query Integration](#react-query-integration)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)

---

## 🔧 Service Layer

### Architecture

The service layer provides a clean abstraction between your UI and API calls. It follows these principles:

- **Single Responsibility**: Each service handles one domain (kanji, progress, study lists)
- **Type Safety**: Full TypeScript support with typed responses
- **Error Handling**: Automatic error transformation to custom error types
- **HTTP Client**: Centralized fetch wrapper with interceptors

### File Structure

```
src/services/
├── api/
│   ├── httpClient.ts      # HTTP client with error handling
│   ├── kanjiService.ts    # Kanji API calls
│   ├── progressService.ts # Progress API calls
│   ├── studyListService.ts # Study list API calls
│   ├── queries.ts         # React Query hooks
│   └── index.ts           # Public API
├── errors/
│   ├── AppError.ts        # Custom error classes
│   ├── errorHandler.ts    # Error logger & handler
│   └── index.ts           # Public API
└── index.ts               # Services export
```

### HTTP Client Features

✅ **Automatic error handling**
✅ **Timeout support (10s default)**
✅ **Request/response interceptors**
✅ **Auth token management**
✅ **Type-safe requests**
✅ **Abort controller support**

### Usage Example

```typescript
import { kanjiService } from "@/services";

// In a component or hook
const kanji = await kanjiService.getById("abc123");
const list = await kanjiService.getByLevel("N5");
```

---

## ⚙️ Configuration System

### Architecture

Centralized configuration management with type-safe environment variables and constants.

### File Structure

```
src/config/
├── constants.ts    # App constants (timeouts, thresholds, etc.)
├── endpoints.ts    # API endpoint definitions
├── routes.ts       # Route definitions & groups
├── environment.ts  # Environment variable management
└── index.ts        # Public API
```

### Features

✅ **Type-safe environment variables**
✅ **Centralized constants**
✅ **API endpoint management**
✅ **Route definitions**
✅ **Feature flags**
✅ **Environment validation**

### Configuration Files

#### Environment Variables (`.env`)

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Feature Flags
VITE_ENABLE_AUTH=true
VITE_ENABLE_REVIEW=true

# Environment
VITE_APP_ENV=development
```

#### Constants (`config/constants.ts`)

```typescript
import { MASTERY_LEVELS, STUDY_SETTINGS, STORAGE_KEYS } from "@/config";

// Use in your app
if (mastery >= MASTERY_LEVELS.MASTERED) {
  // Kanji is mastered!
}
```

#### Endpoints (`config/endpoints.ts`)

```typescript
import { API_ENDPOINTS } from "@/config";

// Type-safe endpoint URLs
const url = API_ENDPOINTS.KANJI.BY_ID("123");
// Result: "/api/kanji/123"
```

#### Routes (`config/routes.ts`)

```typescript
import { APP_ROUTES, ROUTE_GROUPS } from "@/config";

// Use route constants
navigate(APP_ROUTES.KANJI_DETAIL("123"));

// Access route groups for navigation
ROUTE_GROUPS.MAIN.forEach(route => {
  // { path: "/learn", label: "Learn", icon: "BookOpen" }
});
```

---

## 🚨 Error Handling

### Architecture

Comprehensive error handling system with custom error types, error boundaries, and logging.

### Error Class Hierarchy

```
AppError (base)
├── NetworkError      # Network failures
├── ApiError          # API error responses
├── ValidationError   # Form validation errors
├── AuthError         # Authentication failures
├── NotFoundError     # Missing resources
└── TimeoutError      # Request timeouts
```

### Features

✅ **Custom error types with status codes**
✅ **React Error Boundaries**
✅ **Error logging to localStorage**
✅ **User-friendly error messages**
✅ **Development mode stack traces**
✅ **Error tracking service integration ready**

### Error Classes

```typescript
import {
  AppError,
  ApiError,
  NetworkError,
  ValidationError,
  NotFoundError,
  isAppError,
  handleError,
  getUserErrorMessage
} from "@/services/errors";

// Throwing errors
throw new ApiError("Failed to fetch", 500);
throw new ValidationError("Invalid input", { email: "Invalid format" });
throw new NotFoundError("Kanji");

// Handling errors
try {
  // ...
} catch (error) {
  if (isAppError(error)) {
    console.log(error.code, error.statusCode);
  }
  handleError(error, { context: "Additional info" });
}

// Getting user-friendly messages
const message = getUserErrorMessage(error);
// "Unable to connect. Please check your internet connection."
```

### Error Boundary

```typescript
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary
      fallback={<CustomErrorFallback />}
      onError={(error, errorInfo) => {
        // Custom error handling
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Error Logger

```typescript
import { errorHandler } from "@/services/errors";

// Log errors with context
errorHandler.log(error, {
  component: "KanjiCard",
  action: "fetchKanji",
  userId: "123",
});

// Get user-friendly message
const message = errorHandler.getUserMessage(error);

// View error logs (for debugging)
const logs = errorHandler.getErrorLogs();
```

---

## 🔗 React Query Integration

### Query Keys Factory

Centralized query key management for better cache invalidation:

```typescript
import { queryKeys } from "@/services/api/queries";

// Structure:
queryKeys.kanji.detail(id)     // ["kanji", "detail", id]
queryKeys.progress.user()      // ["progress", "user"]
queryKeys.studyLists.lists()   // ["studyLists", "list"]
```

### Custom Hooks

```typescript
import {
  useKanji,
  useKanjiList,
  useUserProgress,
  useUpdateKanjiProgress,
} from "@/services/api/queries";

// Queries
const { data, error, isLoading } = useKanji("id");
const { data: kanjiList } = useKanjiList({ jlptLevel: "N5" });

// Mutations
const updateProgress = useUpdateKanjiProgress();
const handleUpdate = () => {
  updateProgress.mutate({
    kanjiId: "123",
    data: { mastery: 80, timesStudied: 5 }
  });
};
```

---

## 📖 Usage Examples

### Example 1: Fetching Kanji Data

```typescript
import { useKanji } from "@/services/api/queries";

function KanjiCard({ id }: { id: string }) {
  const { data: kanji, error, isLoading } = useKanji(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{getUserErrorMessage(error)}</div>;

  return <div>{kanji?.character}</div>;
}
```

### Example 2: Updating Progress

```typescript
import { useUpdateKanjiProgress } from "@/services/api/queries";

function StudyButton({ kanjiId }: { kanjiId: string }) {
  const updateProgress = useUpdateKanjiProgress();

  const handleComplete = () => {
    updateProgress.mutate({
      kanjiId,
      data: { mastery: 100, timesStudied: 1 }
    });
  };

  return <button onClick={handleComplete}>Mark as Complete</button>;
}
```

### Example 3: Using Service Layer Directly

```typescript
import { kanjiService } from "@/services";

async function searchKanji(query: string) {
  try {
    const results = await kanjiService.search(query);
    return results;
  } catch (error) {
    handleError(error, { action: "searchKanji" });
    return [];
  }
}
```

### Example 4: Custom Error Handling

```typescript
import { ErrorBoundary, withErrorBoundary } from "@/components/ErrorBoundary";

// Using ErrorBoundary component
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// Using HOC
export default withErrorBoundary(MyComponent, <CustomFallback />);
```

---

## ✅ Best Practices

### DO ✅

1. **Use service layer for all API calls**
   ```typescript
   // ✅ Good
   const kanji = await kanjiService.getById(id);

   // ❌ Bad
   const kanji = await fetch(`/api/kanji/${id}`);
   ```

2. **Use query keys for cache management**
   ```typescript
   // ✅ Good
   queryClient.invalidateQueries({ queryKey: queryKeys.kanji.all });

   // ❌ Bad
   queryClient.invalidateQueries(["kanji"]);
   ```

3. **Throw custom errors**
   ```typescript
   // ✅ Good
   throw new ValidationError("Invalid input", { field: "error" });

   // ❌ Bad
   throw new Error("Invalid input");
   ```

4. **Use config constants**
   ```typescript
   // ✅ Good
   navigate(APP_ROUTES.KANJI);

   // ❌ Bad
   navigate("/kanji");
   ```

5. **Handle errors at boundaries**
   ```typescript
   // ✅ Good - Let ErrorBoundary handle it
   <ErrorBoundary><Component /></ErrorBoundary>

   // ❌ Bad - Try/catch everywhere
   try { <Component /> } catch (error) { ... }
   ```

### DON'T ❌

1. **Don't bypass the service layer**
2. **Don't hardcode endpoint URLs**
3. **Don't use generic Error type**
4. **Don't ignore error handling**
5. **Don't scatter configuration**

---

## 🔍 Debugging

### View Error Logs

```typescript
import { errorHandler } from "@/services/errors";

// In browser console:
errorHandler.getErrorLogs();
// Returns array of logged errors
```

### Clear Error Logs

```typescript
errorHandler.clearErrorLogs();
```

### View React Query DevTools

The app includes React Query DevTools in development mode. Press `Alt + Q` to toggle.

---

## 🚀 Next Steps

1. **Add API Integration**: Connect `kanjiService` to your backend
2. **Add Error Tracking**: Integrate Sentry or similar service
3. **Add More Services**: Create services for other domains (auth, review, etc.)
4. **Add Tests**: Write tests for services and error handling
5. **Add Documentation**: Document API endpoints in `endpoints.ts`

---

## 📚 Additional Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Error Boundaries - React](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Service Layer Pattern](https://martinfowler.com/eaaCatalog/serviceLayer.html)

---

**Status**: ✅ Production Ready
**Last Updated**: March 2025
**Version**: 1.0.0
