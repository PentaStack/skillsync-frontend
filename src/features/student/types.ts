/**
 * Student-specific types.
 *
 * Most student data reuses the base User type from @/lib/types.
 * Add student-specific extensions here as the feature grows.
 */
export interface StudentProfile {
  userId: number;
  learningGoals?: string;
  preferredStacks?: number[];
}
