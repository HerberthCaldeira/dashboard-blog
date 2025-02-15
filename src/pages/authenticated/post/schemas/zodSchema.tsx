import { z } from "zod";

export interface ICategoryOption {
  value: string;
  label: string;
}

export interface ICategoryOptions {
  data: ICategoryOption[];
}

const postSchema = z.object({
  id: z.number().nullable(),
  title: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),

  content: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),

  category_id: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .required(),

  is_published: z.boolean().optional(),

  tags: z.array(z.string()).nullish().optional(),
});

export type TPostFormFields = z.infer<typeof postSchema>;

export { postSchema };
