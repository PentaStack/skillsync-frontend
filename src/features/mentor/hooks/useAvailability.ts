import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as mentorApi from "../api/mentor.api";
import type { AvailabilityWindowPayload } from "../types";

const slotsKey = (mentorId: number, date: string) =>
    ["mentors", mentorId, "available-slots", date] as const;

const windowsKey = (mentorId: number) =>
    ["mentors", mentorId, "availability-windows"] as const;

export function useAvailableSlots(mentorId: number, date: string) {
    return useQuery({
        queryKey: slotsKey(mentorId, date),
        queryFn: () => mentorApi.getAvailableSlots(mentorId, date),
        enabled: !!mentorId && !!date,
    });
}

export function useWindows(mentorId: number) {
    return useQuery({
        queryKey: windowsKey(mentorId),
        queryFn: () => mentorApi.getAvailabilityWindows(mentorId),
        enabled: !!mentorId,
    });
}

export function useCreateWindow(mentorId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: AvailabilityWindowPayload) =>
            mentorApi.createWindow(mentorId, payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: windowsKey(mentorId) }),
    });
}

export function useUpdateWindow(mentorId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (vars: {
            windowId: number;
            payload: AvailabilityWindowPayload;
        }) => mentorApi.updateWindow(mentorId, vars.windowId, vars.payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: windowsKey(mentorId) }),
    });
}

export function useDeleteWindow(mentorId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (windowId: number) =>
            mentorApi.deleteWindow(mentorId, windowId),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: windowsKey(mentorId) }),
    });
}
