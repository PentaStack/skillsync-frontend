import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { LoadingFallback } from "@/components/feedback";

const MentorDiscoveryPage = lazy(
  () => import("@/features/mentor/pages/MentorDiscoveryPage"),
);

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated && user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <MentorDiscoveryPage />
    </Suspense>
  );
}
