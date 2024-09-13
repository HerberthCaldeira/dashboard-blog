import { z } from "zod";

const zodSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Obrigatório" })
    .max(50, { message: "Máximo 50" }),
  password: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(50, { message: "Máximo 50" }),
});

export type TLoginFormFields = z.infer<typeof zodSchema>;
export { zodSchema };
