/** Tech stack / specialization. */
export interface Stack {
  id: number;
  name: string;
  description?: string;
}

/** Mentor profile for discovery and detail views. */
export interface Mentor {
  id: number;
  name: string;
  email: string;
  bio: string;
  title: string;
  stacks: Stack[];
  rating: number;
  hourlyRate: number;
  totalSessions: number;
  isApproved: boolean;
  available?: boolean;
}

/** A single availability time slot. */
export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

/** Availability for a specific date. */
export interface Availability {
  date: string;
  slots: TimeSlot[];
}

/** Filters for the mentor discovery search. */
export interface MentorFilters {
  keyword?: string;
  stackIds?: number[];
  sortBy?: "rating" | "price" | "availability";
  page?: number;
  size?: number;
}
