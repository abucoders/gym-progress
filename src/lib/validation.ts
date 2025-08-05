import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Register Schema
export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirm: z.string().min(8),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

// Task Schema
export const taskSchema = z.object({
  title: z.string().min(5),
});
