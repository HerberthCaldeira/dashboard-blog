import { z } from "zod";

const zodSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Obrigatório" })
    .max(255, { message: "Máximo 255" }),
});

export { zodSchema };
