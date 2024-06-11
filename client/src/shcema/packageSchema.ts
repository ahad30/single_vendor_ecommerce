import { z } from "zod";

// Regex to ensure quantity is a non-fractional number
const nonFractionRegex = /^\d+$/;

// Regex to ensure price is a fractional number
const fractionRegex = /^\d+(\.\d+)?$/;

export const packageSchema = z.object({
  name: z.string().nonempty("Please fill the name"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Please upload a file",
  }),
  quantity: z
    .string()
    .regex(nonFractionRegex, { message: "Quantity must be an integer" }),
  price: z
    .string()
    .regex(fractionRegex, {
      message: "Price must be a number with up to two decimal places",
    }),
  status: z.string().nonempty("Please select a status"),
  items: z.array(
    z.object({
      product_name: z.string().nonempty("Please fill the product name"),
      price: z
        .string()
        .regex(fractionRegex, {
          message: "Price must be a number with up to two decimal places",
        }),
      quantity: z
        .string()
        .regex(nonFractionRegex, { message: "Quantity must be an integer" }),
    })
  ),
});
