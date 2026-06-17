import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import type { Mentor } from "../types";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link to={`/mentors/${mentor.id}`} className="block h-full">
      <Card className="flex h-full flex-col transition-colors hover:border-ember/40">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg italic text-text-primary">{mentor.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{mentor.title}</p>
          </div>
          <div className="flex items-center gap-1 text-ember">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{mentor.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-text-secondary">{mentor.bio}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {mentor.stacks.map((stack) => (
            <Badge key={stack.id} variant="ember">
              {stack.name}
            </Badge>
          ))}
          {mentor.available && <Badge variant="success">Available</Badge>}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-text-secondary">{mentor.totalSessions} sessions</span>
          <span className="font-semibold text-text-primary">${mentor.hourlyRate}/hr</span>
        </div>
      </Card>
    </Link>
  );
}
