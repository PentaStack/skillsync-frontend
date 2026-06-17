import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllStudents } from "../hooks/useAdmin";
import { Card } from "@/components/ui/Card";
import { Skeleton, SkeletonLine } from "@/components/ui/Skeleton";

export default function AdminStudentListPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useAllStudents(page);

  return (
    <div className="mx-auto max-w-container px-gutter py-8">
      <h1 className="font-display text-display-lg-mobile italic text-text-primary md:text-display-lg">
        All Students
      </h1>
      <p className="mt-2 font-body text-body-lg text-text-secondary">
        View all students registered in the platform
      </p>

      <div className="mt-8">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                <SkeletonLine className="flex-1" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!data?.items || data.items.length === 0) && (
          <Card className="p-8 text-center">
            <p className="font-body text-body-lg text-text-secondary">No students found.</p>
          </Card>
        )}

        {data?.items && data.items.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface-container-low">
                    <th className="px-4 py-3 text-left font-body text-label-caps uppercase tracking-widest text-text-secondary">Name / Email</th>
                    <th className="px-4 py-3 text-left font-body text-label-caps uppercase tracking-widest text-text-secondary">Total Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-container-low"
                    >
                      <td className="px-4 py-3">
                        <Link to={`/admin/students/${student.id}`} className="block">
                          <div className="font-medium text-text-primary">{student.displayName}</div>
                          <div className="text-code-sm text-text-secondary">{student.email}</div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-body text-body-md text-text-primary">{student.totalSessions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  className="rounded-lg border border-border px-4 py-2 font-body text-body-md text-text-secondary hover:bg-surface-container-low disabled:opacity-40"
                  disabled={page <= 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <span className="font-body text-code-sm text-text-secondary">
                  Page {page + 1} of {data.totalPages} ({data.totalElements} total)
                </span>
                <button
                  className="rounded-lg border border-border px-4 py-2 font-body text-body-md text-text-secondary hover:bg-surface-container-low disabled:opacity-40"
                  disabled={page >= data.totalPages - 1}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
