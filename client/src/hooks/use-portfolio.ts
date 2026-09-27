import { projects, skills, experience } from "@/lib/data";

export interface InsertContactMessage {
  name: string;
  email: string;
  message: string;
}

// ============================================
// PROJECTS HOOKS (Instant Static Resolution)
// ============================================
export function useProjects() {
  return { data: projects, isLoading: false };
}

// ============================================
// SKILLS HOOKS (Instant Static Resolution)
// ============================================
export function useSkills() {
  return { data: skills, isLoading: false };
}

// ============================================
// EXPERIENCE HOOKS (Instant Static Resolution)
// ============================================
export function useExperience() {
  return { data: experience, isLoading: false };
}
