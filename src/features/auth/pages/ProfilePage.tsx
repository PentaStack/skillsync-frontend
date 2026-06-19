import { useAuthStore } from "@/stores/auth.store";
import MentorProfilePage from "./../../mentor/pages/MentorProfilePage";

/**
 * ProfilePage — Contextual workspace to adjust user profiles.
 */
export default function ProfilePage() {
  const { user } = useAuthStore();

  if (user?.role === "MENTOR") {
    return <MentorProfilePage />;
  }

  return (
    <div className="mx-auto max-w-container px-gutter py-8">
      <h1 className="font-display text-display-lg-mobile italic text-text-primary md:text-display-lg">
        Profile
      </h1>
      <p className="mt-2 font-body text-body-lg text-text-secondary">
        Customize your SkillSync profile
      </p>
      {/* TODO: Profile form implementation */}
    </div>
  );
}
