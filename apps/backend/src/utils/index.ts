import { z } from "zod";

/**
 * Refines a zod string field to check if it meets the following criteria:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 *
 * @param value - The password to check
 * @param ctx - The zod context
 * @returns Returns false if the password does not meet the criteria
 */
export const checkPasswordComplexity = (
  value: string,
  ctx: z.RefinementCtx,
): boolean => {
  // Password must be at least 8 characters
  if (value.length < 8) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: "Password must be at least 8 characters long.",
    });
    return false;
  }

  // Password must contain at least one uppercase letter
  if (!value.match(/[A-Z]/)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one uppercase letter",
    });
    return false;
  }

  // Password must contain at least one lowercase letter
  if (!value.match(/[a-z]/)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one lowercase letter",
    });
    return false;
  }

  // Password must contain at least one number
  if (!value.match(/[0-9]/)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one number",
    });
    return false;
  }

  // Password must contain at least one special character
  if (!value.match(/[^A-Za-z0-9]/)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one special character",
    });
    return false;
  }

  return true;
};
