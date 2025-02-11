import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(3, "password must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters and numbers only)"
    ),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(3, "password must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters and numbers only)"
    ),
});

export const createNoteSchema = z.object({
  title: z.string().min(3, "Please provide a title for your note"),
  content: z.string().min(5, "Note must have a content"),
  tags: z.array(z.string()).optional()
})

export const updateNoteSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(5).optional(),
  tags: z.array(z.string()).optional()
})

export const pinNoteSchema = z.object({
  isPinned: z.boolean("this field should be boolean")
})