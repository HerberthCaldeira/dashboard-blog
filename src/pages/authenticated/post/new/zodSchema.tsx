import { z } from "zod";

const zodSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),

  content: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),

  category_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export type TPostFormFields = z.infer<typeof zodSchema>;

export { zodSchema };
