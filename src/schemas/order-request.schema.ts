import { z } from "zod";

export const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

type ValidationMessages = {
  form_error_vin: string;
  form_error_name: string;
  form_error_phone: string;
  form_error_phone_format: string;
  form_error_problem: string;
};

export const createOrderRequestSchema = (messages: ValidationMessages) => {
  return z.object({
    vin: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((value) => !value || vinRegex.test(value), {
        message: messages.form_error_vin,
      }),
    name: z
      .string()
      .min(2, messages.form_error_name)
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .min(1, messages.form_error_phone)
      .transform((value) => value.replace(/\D/g, ""))
      .refine((digits) => digits.length === 12, {
        message: messages.form_error_phone_format,
      }),

    brand: z.string().optional().or(z.literal("")),
    model: z.string().optional().or(z.literal("")),
    year: z.string().optional().or(z.literal("")),

    problem: z.string().min(5, messages.form_error_problem),

    email: z.string().optional(),
  });
};

export type OrderRequestFormValues = z.infer<
  ReturnType<typeof createOrderRequestSchema>
>;
