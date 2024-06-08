/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const weightRegex = /^\d+(\.\d+)?$/;

export const productSchema: any = z.object({
  thumbnail: z.any().refine((file) => file instanceof File, {
    message: "Please upload a file",
  }),
  name: z.string().nonempty("Please fill the product name"),
  slug: z.string().nonempty("Please fill the product slug"),
  category_id: z.number().int().positive("Please enter a valid category ID"),
  brand_id: z.number().int().positive("Please enter a valid brand ID"),
  weight: z
    .string()
    .regex(
      weightRegex,
      "Weight must be a positive number with optional fractions"
    ),
  description: z.string().nonempty("Please fill the product description"),
  is_published: z.string().nonempty("Please fill the list type"),
  is_single_product: z.string().nonempty("Please fill the list type"),
  list_type: z.string().nonempty("Please fill the list type"),
});
