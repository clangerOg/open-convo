import { checkPasswordComplexity } from "src/utils";
import { z } from "zod";

export const handleRegistrationDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).superRefine(checkPasswordComplexity),
});

export type HandleRegistrationData = z.infer<
  typeof handleRegistrationDataSchema
>;

export const handleLoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type HandleLoginData = z.infer<typeof handleLoginDataSchema>;
