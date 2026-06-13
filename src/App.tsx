import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import { ErrorBoundary } from "@/components/feedback";

/**
 * Root application component.
 *
 * Renders the router provider which manages all routing and page rendering.
 * Wrapped in ErrorBoundary to catch any unhandled rendering errors.
 */
function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
