import { apiClient } from "@/lib/api-client";
import type { PaginatedResponse } from "@/lib/types";
import type { Availability, AvailabilityWindow, AvailabilityWindowInput, Mentor, MentorFilters } from "../types";

/**
 * Mentor API endpoints.
 *
 * GET /api/mentors                        → Paginated mentor list with filters
 * GET /api/mentors/:id                    → Single mentor profile
 * GET /api/mentors/:id/availability       → Available slots for a date
 */

export async function getMentors(
  filters: MentorFilters = {},
): Promise<PaginatedResponse<Mentor>> {
  const params = new URLSearchParams();

  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.stackId) params.set("stack", String(filters.stackId));
  if (filters.sortBy) params.set("sort_by", filters.sortBy);
  if (filters.page) params.set("page", String(filters.page));

  const { data } = await apiClient.get<PaginatedResponse<Mentor>>(
    `/mentors?${params.toString()}`,
  );
  return data;
}

export async function getMentorById(id: number): Promise<Mentor> {
  const { data } = await apiClient.get<Mentor>(`/mentors/${id}`);
  return data;
}

export async function getMentorAvailability(
  mentorId: number,
  date: string,
): Promise<Availability> {
  const { data } = await apiClient.get<Availability>(
    `/mentors/${mentorId}/availability?date=${date}`,
  );
  return data;
}

export async function getMyMentorId(): Promise<{ mentorId: number }> {
  const { data } = await apiClient.get<{ mentorId: number }>("/mentors/me");
  return data;
}

export async function getAvailabilityWindows(mentorId: number): Promise<AvailabilityWindow[]> {
  const { data } = await apiClient.get<AvailabilityWindow[]>(`/mentors/${mentorId}/availability/windows`);
  return data;
}

export async function createAvailabilityWindow(mentorId: number, body: AvailabilityWindowInput): Promise<AvailabilityWindow> {
  const { data } = await apiClient.post<AvailabilityWindow>(`/mentors/${mentorId}/availability/windows`, body);
  return data;
}

export async function updateAvailabilityWindow(mentorId: number, windowId: number, body: AvailabilityWindowInput): Promise<AvailabilityWindow> {
  const { data } = await apiClient.put<AvailabilityWindow>(`/mentors/${mentorId}/availability/windows/${windowId}`, body);
  return data;
}

export async function deleteAvailabilityWindow(mentorId: number, windowId: number): Promise<void> {
  await apiClient.delete(`/mentors/${mentorId}/availability/windows/${windowId}`);
}
