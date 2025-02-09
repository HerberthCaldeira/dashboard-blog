import { z } from "zod";

const categorySchema = z.object({
  id: z.number().nullable(),
  name: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),
});

export type TCategoryFormFields = z.infer<typeof categorySchema>;
export { categorySchema };
