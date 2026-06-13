import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import * as sessionApi from "../../session/api/session.api";

/**
 * Hooks for the student's session view.
 * Wraps shared session API with student-scoped query keys.
 */

/** Fetch all sessions for the currently authenticated student. */
export function useStudentSessions() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["sessions", "student"],
    queryFn: () => sessionApi.getSessions(),
    enabled: isAuthenticated,
  });
}
