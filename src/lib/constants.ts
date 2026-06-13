/**
 * Application-wide constants.
 */

/** User roles within the platform. */
export const Role = {
  STUDENT: "STUDENT",
  MENTOR: "MENTOR",
  ADMIN: "ADMIN",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];

/** Session configuration */
export const SESSION_DURATION_MINUTES = 45;

/** Search debounce delay in milliseconds */
export const DEBOUNCE_MS = 500;

/** Default pagination page size */
export const ITEMS_PER_PAGE = 10;

/** Local storage keys */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "skillsync_token",
  THEME: "skillsync_theme",
  LOCALE: "skillsync_locale",
} as const;
