import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be 50 characters or less"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be 50 characters or less"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\+?[\d\s()-]{7,20}$/.test(value),
      "Enter a valid phone number",
    ),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be 500 characters or less")
    .optional(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
