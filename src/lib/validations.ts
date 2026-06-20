import { z } from "zod";
import type { LeadStatus } from "@/db/schema";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  industry: z.string().min(1, "Industry is required"),
  clientName: z.string().optional(),
  coverImage: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
  technologyNames: z.array(z.string()),
  galleryImages: z.array(
    z.object({
      imageUrl: z.string().min(1),
      displayOrder: z.number(),
    })
  ),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  company: z.string().min(1, "Company is required"),
  designation: z.string().min(1, "Designation is required"),
  review: z.string().min(1, "Review is required"),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  featured: z.boolean(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  displayOrder: z.number(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const leadStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "MEETING",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
]);

export type ProjectFormData = z.infer<typeof projectSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LeadStatusValue = LeadStatus;
