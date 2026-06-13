import { useEffect } from "react";

/**
 * Dynamically set the document title with the app name prefix.
 *
 * @example useDocumentTitle("Mentor Discovery");
 * // Sets: "Mentor Discovery | SkillSync"
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const appName = import.meta.env.VITE_APP_NAME || "SkillSync";
    document.title = title ? `${title} | ${appName}` : appName;

    return () => {
      document.title = appName;
    };
  }, [title]);
}
