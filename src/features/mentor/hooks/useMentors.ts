import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as mentorApi from "../api/mentor.api";
import type { AvailabilityWindowInput, MentorFilters } from "../types";

/**
 * TanStack Query hooks for mentor operations.
 */

/** Fetch paginated mentor list with search/sort filters. */
export function useMentors(filters: MentorFilters = {}) {
  return useQuery({
    queryKey: ["mentors", filters],
    queryFn: () => mentorApi.getMentors(filters),
  });
}

/** Fetch a single mentor's full profile. */
export function useMentorProfile(id: number) {
  return useQuery({
    queryKey: ["mentors", id],
    queryFn: () => mentorApi.getMentorById(id),
    enabled: !!id,
  });
}

/** Fetch a mentor's available time slots for a given date. */
export function useMentorAvailability(mentorId: number, date: string) {
  return useQuery({
    queryKey: ["mentors", mentorId, "availability", date],
    queryFn: () => mentorApi.getMentorAvailability(mentorId, date),
    enabled: !!mentorId && !!date,
  });
}

/** Fetch the current user's mentor profile id. */
export function useMyMentorId() {
  return useQuery({
    queryKey: ["mentors", "me"],
    queryFn: mentorApi.getMyMentorId,
  });
}

/** Fetch all availability windows for a mentor. */
export function useAvailabilityWindows(mentorId: number) {
  return useQuery({
    queryKey: ["mentors", mentorId, "availability", "windows"],
    queryFn: () => mentorApi.getAvailabilityWindows(mentorId),
    enabled: !!mentorId,
  });
}

export function useCreateAvailabilityWindow(mentorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: AvailabilityWindowInput) => mentorApi.createAvailabilityWindow(mentorId, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mentors", mentorId, "availability", "windows"] }),
  });
}

export function useUpdateAvailabilityWindow(mentorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ windowId, ...body }: AvailabilityWindowInput & { windowId: number }) =>
      mentorApi.updateAvailabilityWindow(mentorId, windowId, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mentors", mentorId, "availability", "windows"] }),
  });
}

export function useDeleteAvailabilityWindow(mentorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (windowId: number) => mentorApi.deleteAvailabilityWindow(mentorId, windowId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mentors", mentorId, "availability", "windows"] }),
  });
}
