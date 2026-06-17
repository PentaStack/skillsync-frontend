import { Link, useParams } from "react-router-dom";
import { ArrowLeft, DollarSign, Star, Users } from "lucide-react";
import { Badge, Button, Card, EmptyState, Skeleton, SkeletonLine } from "@/components/ui";
import { useMentorProfile } from "../hooks/useMentors";

export default function MentorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const mentorId = Number(id);
  const { data: mentor, isLoading, error } = useMentorProfile(mentorId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-gutter py-8">
        <Skeleton className="mb-6 h-8 w-40" />
        <Card className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <SkeletonLine />
          <SkeletonLine className="w-5/6" />
          <Skeleton className="h-24 w-full" />
        </Card>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="mx-auto max-w-4xl px-gutter py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-ember">
          <ArrowLeft className="h-4 w-4" />
          Back to discovery
        </Link>
        <EmptyState
          icon={<Users className="h-10 w-10" />}
          title="Mentor not found"
          description="This mentor profile may have been removed or is unavailable."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-gutter py-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-ember">
        <ArrowLeft className="h-4 w-4" />
        Back to discovery
      </Link>

      <Card accentBar>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-display text-headline-md italic text-text-primary">{mentor.name}</h1>
            <p className="mt-2 text-lg text-text-secondary">{mentor.title}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.stacks.map((stack) => (
                <Badge key={stack.id} variant="ember">
                  {stack.name}
                </Badge>
              ))}
              {mentor.available && <Badge variant="success">Available now</Badge>}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface-container-high p-4 min-w-[200px]">
            <div className="flex items-center gap-2 text-ember">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-2xl font-semibold">{mentor.rating.toFixed(1)}</span>
              <span className="text-sm text-text-secondary">rating</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <DollarSign className="h-5 w-5 text-ember" />
              <span className="text-2xl font-semibold">${mentor.hourlyRate}</span>
              <span className="text-sm text-text-secondary">/ hour</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users className="h-4 w-4" />
              {mentor.totalSessions} completed sessions
            </div>
          </div>
        </div>
      </Card>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">About</h2>
        <Card>
          <p className="text-body-md leading-relaxed text-text-secondary">{mentor.bio}</p>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">Book a session</h2>
        <Card>
          <p className="mb-4 text-sm text-text-secondary">
            Session booking and availability calendar will be available in a future update.
          </p>
          <Button disabled>Book session</Button>
        </Card>
      </section>
    </div>
  );
}
