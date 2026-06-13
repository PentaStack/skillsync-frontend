import { apiClient } from "@/lib/api-client";

/**
 * Student-specific API endpoints.
 *
 * Most student operations (sessions, profile) use shared endpoints.
 * Add student-specific endpoints here as needed.
 */

/** Example: Fetch student-specific data if backend provides it. */
export async function getStudentProfile(userId: number) {
  const { data } = await apiClient.get(`/students/${userId}`);
  return data;
}
