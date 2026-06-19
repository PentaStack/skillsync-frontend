import { apiClient } from "@/lib/api-client";
import type { PaginatedResponse } from "@/lib/types";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type {
  Availability,
  AvailabilityWindow,
  AvailabilityWindowPayload,
  AvailableSlotsResponse,
  Mentor,
  MentorFilters,
} from "../types";

export async function getMentors(
  filters: MentorFilters = {},
): Promise<PaginatedResponse<Mentor>> {
  const params = new URLSearchParams();

  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.stackIds?.length) params.set("stack", filters.stackIds.join(","));
  if (filters.sortBy) params.set("sort_by", filters.sortBy);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  params.set("size", String(filters.size ?? ITEMS_PER_PAGE));

  const { data } = await apiClient.get<PaginatedResponse<Mentor>>(
    `/mentors?${params.toString()}`,
  );
  return data;
}

export async function getMentorById(id: number): Promise<Mentor> {
  const { data } = await apiClient.get<Mentor>(`/mentors/${id}`);
  return data;
}

export async function updateMentor(
  id: number,
  mentorData: { title: string; bio: string; hourlyRate: number; available: boolean }
): Promise<Mentor> {
  const { data } = await apiClient.put<Mentor>(`/mentors/${id}`, mentorData);
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

export async function getAvailableSlots(
  mentorId: number,
  date: string,
): Promise<AvailableSlotsResponse> {
  const { data } = await apiClient.get<AvailableSlotsResponse>(
    `/mentors/${mentorId}/available-slots?date=${date}`,
  );
  return data;
}

export async function getAvailabilityWindows(
  mentorId: number,
): Promise<AvailabilityWindow[]> {
  const { data } = await apiClient.get<AvailabilityWindow[]>(
    `/mentors/${mentorId}/availability`,
  );
  return data;
}

export async function createWindow(
  mentorId: number,
  payload: AvailabilityWindowPayload,
): Promise<AvailabilityWindow> {
  const { data } = await apiClient.post<AvailabilityWindow>(
    `/mentors/${mentorId}/availability`,
    payload,
  );
  return data;
}

export async function updateWindow(
  mentorId: number,
  windowId: number,
  payload: AvailabilityWindowPayload,
): Promise<AvailabilityWindow> {
  const { data } = await apiClient.put<AvailabilityWindow>(
    `/mentors/${mentorId}/availability/${windowId}`,
    payload,
  );
  return data;
}

export async function deleteWindow(
  mentorId: number,
  windowId: number,
): Promise<void> {
  await apiClient.delete(`/mentors/${mentorId}/availability/${windowId}`);
}
