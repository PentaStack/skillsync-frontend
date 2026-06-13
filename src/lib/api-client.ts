import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import type { ApiError } from "./types";

/**
 * Pre-configured Axios instance for all API calls.
 *
 * - Base URL sourced from env
 * - Auto-attaches JWT Bearer token from Zustand auth store
 * - Intercepts 401 responses → triggers auto-logout
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* ─── Request Interceptor: Attach JWT ──────────────────────────────── */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ─── Response Interceptor: Handle Errors ──────────────────────────── */

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Auto-logout on 401 Unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    // Normalize error into ApiError shape
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  },
);
