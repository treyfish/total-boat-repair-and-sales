import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  service_type: z.string().optional(),
  boat_id: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const boatFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive().nullable().optional(),
  year: z.number().int().min(1950).max(2030).nullable().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  length_ft: z.number().positive().nullable().optional(),
  engine_make: z.string().optional(),
  engine_hp: z.number().positive().nullable().optional(),
  hull_material: z.string().optional(),
  fuel_type: z.string().optional(),
  status: z.enum(["available", "pending", "sold"]),
  featured: z.boolean(),
  photos: z.array(z.string()),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type BoatFormValues = z.infer<typeof boatFormSchema>;
