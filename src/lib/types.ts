import type { RoleType } from "./constants";

/**
 * Shared types used across multiple feature modules.
 */

/** Standard API error shape returned by the backend. */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

/** Generic paginated response wrapper. */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

/** Generic API response wrapper. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Base user object shared across roles. */
export interface User {
  id: number;
  name: string;
  email: string;
  role: RoleType;
  avatar?: string;
  createdAt: string;
}
