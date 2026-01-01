import { useQuery, useMutation } from "@tanstack/react-query";
import { projects, skills, experience, minorProjects } from "@/lib/data";

export interface InsertContactMessage {
  name: string;
  email: string;
  message: string;
}

// ============================================
// PROJECTS HOOKS
// ============================================
export function useProjects() {
  return useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => projects,
  });
}

// ============================================
// SKILLS HOOKS
// ============================================
export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: async () => skills,
  });
}

// ============================================
// EXPERIENCE HOOKS
// ============================================
export function useExperience() {
  return useQuery({
    queryKey: ["/api/experience"],
    queryFn: async () => experience,
  });
}

// ============================================
// MINOR PROJECTS HOOKS
// ============================================
export function useMinorProjects() {
  return useQuery({
    queryKey: ["/api/minor-projects"],
    queryFn: async () => minorProjects,
  });
}

// ============================================
// CONTACT HOOKS
// ============================================
export function useContact() {
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      console.log("Contact form submitted (Frontend only):", data);
      return { success: true, message: "Message sent successfully" };
    },
  });
}
