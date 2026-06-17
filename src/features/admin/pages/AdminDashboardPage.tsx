import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton, SkeletonLine } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  useAdminStats,
  usePendingRegistrations,
  usePendingLiveVerifications,
  useUpdateRegistrationVerification,
  useUpdateLiveVerification,
} from "../hooks/useAdmin";

function StatCard({
  label,
  value,
  loading,
}: {
  label: string;
  value: string | number | null | undefined;
  loading: boolean;
}) {
  return (
    <Card className="flex flex-col gap-1">
      {loading ? (
        <>
          <SkeletonLine className="w-24" />
          <Skeleton className="mt-1 h-8 w-16" />
        </>
      ) : (
        <>
          <span className="font-body text-label-caps uppercase tracking-widest text-text-secondary">
            {label}
          </span>
          <span className="font-display text-headline-md italic text-text-primary">
            {value ?? "—"}
          </span>
        </>
      )}
    </Card>
  );
}

function AdminTable<T extends { id: number }>({
  columns,
  data,
  loading,
  page,
  totalPages,
  totalElements,
  onPageChange,
  onApprove,
  onReject,
  emptyTitle,
  emptyDescription,
  processingIds,
}: {
  columns: {
    header: string;
    render: (item: T) => React.ReactNode;
  }[];
  data: T[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onApprove: (item: T) => void;
  onReject: (item: T) => void;
  emptyTitle: string;
  emptyDescription?: string;
  processingIds: Set<number>;
}) {
  if (loading && data.length === 0) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <SkeletonLine className="flex-1" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-container-low">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-4 py-3 text-left font-body text-label-caps uppercase tracking-widest text-text-secondary"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-body text-label-caps uppercase tracking-widest text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-container-low"
              >
                {columns.map((col) => (
                  <td key={col.header} className="px-4 py-3 font-body text-body-md text-text-primary">
                    {col.render(item)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={processingIds.has(item.id)}
                      onClick={() => onReject(item)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={processingIds.has(item.id)}
                      onClick={() => onApprove(item)}
                    >
                      {processingIds.has(item.id) ? "..." : "Approve"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 0}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="font-body text-code-sm text-text-secondary">
            Page {page + 1} of {totalPages} ({totalElements} total)
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function formatDate(dateString: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export default function AdminDashboardPage() {
  const [regPage, setRegPage] = useState(0);
  const [livePage, setLivePage] = useState(0);
  const [processingRegIds, setProcessingRegIds] = useState<Set<number>>(new Set());
  const [processingLiveIds, setProcessingLiveIds] = useState<Set<number>>(new Set());

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: regData, isLoading: regLoading } = usePendingRegistrations(regPage);
  const { data: liveData, isLoading: liveLoading } = usePendingLiveVerifications(livePage);

  const updateRegVerification = useUpdateRegistrationVerification();
  const updateLiveVerification = useUpdateLiveVerification();

  function handleApproveRegistration(item: { id: number }) {
    setProcessingRegIds((prev) => new Set(prev).add(item.id));
    updateRegVerification.mutate(
      { id: item.id, isVerified: true },
      {
        onSettled: () => {
          setProcessingRegIds((prev) => {
            const next = new Set(prev);
            next.delete(item.id);
            return next;
          });
        },
      },
    );
  }

  function handleRejectRegistration(item: { id: number }) {
    setProcessingRegIds((prev) => new Set(prev).add(item.id));
    updateRegVerification.mutate(
      { id: item.id, isVerified: false },
      {
        onSettled: () => {
          setProcessingRegIds((prev) => {
            const next = new Set(prev);
            next.delete(item.id);
            return next;
          });
        },
      },
    );
  }

  function handleApproveLive(item: { id: number }) {
    setProcessingLiveIds((prev) => new Set(prev).add(item.id));
    updateLiveVerification.mutate(
      { id: item.id, isVerified: true },
      {
        onSettled: () => {
          setProcessingLiveIds((prev) => {
            const next = new Set(prev);
            next.delete(item.id);
            return next;
          });
        },
      },
    );
  }

  function handleRejectLive(item: { id: number }) {
    setProcessingLiveIds((prev) => new Set(prev).add(item.id));
    updateLiveVerification.mutate(
      { id: item.id, isVerified: false },
      {
        onSettled: () => {
          setProcessingLiveIds((prev) => {
            const next = new Set(prev);
            next.delete(item.id);
            return next;
          });
        },
      },
    );
  }

  return (
    <div className="mx-auto max-w-container px-gutter py-8">
      <h1 className="font-display text-display-lg-mobile italic text-text-primary md:text-display-lg">
        Admin Dashboard
      </h1>
      <p className="mt-2 font-body text-body-lg text-text-secondary">
        Manage users, stacks, and platform settings
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Sessions" value={stats?.totalSessions} loading={statsLoading} />
        <StatCard label="Active Mentors" value={stats?.activeMentors} loading={statsLoading} />
        <StatCard label="Avg Platform Rating" value={stats?.averagePlatformRating != null ? stats.averagePlatformRating.toFixed(2) : "—"} loading={statsLoading} />
        <StatCard label="Pending Registrations" value={stats?.pendingRegistrations} loading={statsLoading} />
        <StatCard label="Pending Live Verifications" value={stats?.pendingLiveVerifications} loading={statsLoading} />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-headline-md italic text-text-primary">
          New Mentor Applications
        </h2>
        <p className="mt-1 font-body text-body-md text-text-secondary">
          Mentor registration requests that have not yet been verified.
        </p>
        <div className="mt-4">
          <AdminTable
            columns={[
              { header: "Name / Email", render: (item) => (
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-code-sm text-text-secondary">{item.email}</div>
                </div>
              )},
              { header: "Stack", render: (item) => item.stackName },
              { header: "Applied", render: (item) => formatDate(item.appliedDate) },
            ]}
            data={regData?.items ?? []}
            loading={regLoading}
            page={regPage}
            totalPages={regData?.totalPages ?? 0}
            totalElements={regData?.totalElements ?? 0}
            onPageChange={setRegPage}
            onApprove={handleApproveRegistration}
            onReject={handleRejectRegistration}
            emptyTitle="No pending registration requests"
            emptyDescription="New mentor applications will appear here."
            processingIds={processingRegIds}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-headline-md italic text-text-primary">
          Live Directory — Unverified Mentors
        </h2>
        <p className="mt-1 font-body text-body-md text-text-secondary">
          Mentors in the live directory who are not yet available for booking.
        </p>
        <div className="mt-4">
          <AdminTable
            columns={[
              { header: "Name / Email", render: (item) => (
                <div>
                  <div className="font-medium">{item.displayName}</div>
                  <div className="text-code-sm text-text-secondary">{item.email}</div>
                </div>
              )},
              { header: "Stack", render: (item) => item.stackName },
              { header: "Rating", render: (item) =>
                item.rating != null ? item.rating.toFixed(1) : "—"
              },
            ]}
            data={liveData?.items ?? []}
            loading={liveLoading}
            page={livePage}
            totalPages={liveData?.totalPages ?? 0}
            totalElements={liveData?.totalElements ?? 0}
            onPageChange={setLivePage}
            onApprove={handleApproveLive}
            onReject={handleRejectLive}
            emptyTitle="No pending live verifications"
            emptyDescription="All mentors in the directory are available."
            processingIds={processingLiveIds}
          />
        </div>
      </section>
    </div>
  );
}
