import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * NotFoundPage — 404 catch-all page.
 */
export default function NotFoundPage() {
  useDocumentTitle("404 — Page Not Found");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* Large 404 number */}
      <span className="font-display text-[120px] font-bold leading-none text-ember/20 md:text-[180px]">
        404
      </span>

      <h1 className="mt-4 font-display text-display-lg-mobile italic text-text-primary md:text-display-lg">
        Page Not Found
      </h1>

      <p className="mt-3 max-w-md font-body text-body-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex rounded bg-ember px-6 py-3 font-body text-body-md font-bold text-canvas transition-all hover:shadow-ember"
      >
        Back to Home
      </Link>
    </div>
  );
}
