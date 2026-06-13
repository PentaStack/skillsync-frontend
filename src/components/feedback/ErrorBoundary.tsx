import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Error boundary — catches rendering errors and displays a fallback.
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h2 className="font-display text-headline-md italic text-text-primary">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md font-body text-body-md text-text-secondary">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded bg-ember px-5 py-2.5 font-body text-body-md font-bold text-canvas transition-all hover:shadow-ember"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
