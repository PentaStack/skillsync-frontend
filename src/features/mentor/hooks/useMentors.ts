import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mentorApi from "../api/mentor.api";
import type { MentorFilters } from "../types";

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

/** Update a mentor's profile. */
export function useUpdateMentor(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; bio: string; hourlyRate: number; available: boolean }) =>
      mentorApi.updateMentor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors", id] });
    },
  });
}
