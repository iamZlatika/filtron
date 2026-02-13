import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(100, "Слишком длинное значение"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
