import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, {
    message: "O email deve ter no mínimo 1 caractere.",
  }),
  password: z.string().min(1, {
    message: "A senha deve ter no mínimo 1 caractere.",
  }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
