import { z } from "zod";

/**
 * Form schemas for the CMS editors.
 *
 * Each schema mirrors the corresponding backend TypeBox schema exactly
 * (`backend/src/interface/apiSchema.ts`) so client-side validation can never
 * accept something the API would reject — or reject something it accepts.
 *
 * `z.infer` is the single source of truth for form value types; no DTO is
 * hand-written twice.
 */

/* ------------------------------------------------------------------ */
/* Project                                                             */
/* ------------------------------------------------------------------ */

export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(160, "Title must be 160 characters or fewer."),
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(2000, "Description must be 2000 characters or fewer."),
  category: z
    .string()
    .trim()
    .min(1, "Category is required.")
    .max(60, "Category must be 60 characters or fewer."),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Image URL is required.")
    .max(500, "Image URL must be 500 characters or fewer."),
  techStack: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tech name cannot be empty.")
        .max(60, "Tech name must be 60 characters or fewer."),
    )
    .min(1, "Add at least one technology.")
    .max(20, "At most 20 technologies are allowed."),
});

export type TProjectFormValues = z.infer<typeof projectFormSchema>;

/* ------------------------------------------------------------------ */
/* Skill                                                               */
/* ------------------------------------------------------------------ */

export const skillFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required.")
    .max(120, "Skill name must be 120 characters or fewer."),
  badgeUrl: z
    .string()
    .trim()
    .min(1, "Badge URL is required.")
    .max(500, "Badge URL must be 500 characters or fewer."),
  category: z
    .string()
    .trim()
    .min(1, "Category is required.")
    .max(60, "Category must be 60 characters or fewer."),
});

export type TSkillFormValues = z.infer<typeof skillFormSchema>;

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const statItemSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "Value is required.")
    .max(32, "Value must be 32 characters or fewer."),
  label: z
    .string()
    .trim()
    .min(1, "Label is required.")
    .max(120, "Label must be 120 characters or fewer."),
});

export const profileFormSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(1, "Headline is required.")
    .max(200, "Headline must be 200 characters or fewer."),
  bio: z
    .string()
    .trim()
    .min(1, "Bio is required.")
    .max(5000, "Bio must be 5000 characters or fewer."),
  location: z
    .string()
    .trim()
    .min(1, "Location is required.")
    .max(120, "Location must be 120 characters or fewer."),
  status: z
    .string()
    .trim()
    .min(1, "Status is required.")
    .max(60, "Status must be 60 characters or fewer."),
  education: z
    .string()
    .trim()
    .min(1, "Education is required.")
    .max(160, "Education must be 160 characters or fewer."),
  stats: z
    .array(statItemSchema)
    .max(12, "At most 12 stat cards are allowed."),
});

export type TProfileFormValues = z.infer<typeof profileFormSchema>;
export type TStatItemValues = z.infer<typeof statItemSchema>;