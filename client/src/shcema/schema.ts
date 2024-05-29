/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/;

export const userSchema: any = z
  .object({
    name: z.string().nonempty("Please fill the name"),
    role: z.string().nonempty("Please select a role"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
    address: z.string().nonempty("Please fill the address"),
    password: z
      .string()
      .min(8, "Password should be at least 6 characters long"),
    password_confirmation: z
      .string()
      .min(8, "Confirm password should be at least 6 characters long"),
    image: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Please upload a file",
      })
      .optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });
