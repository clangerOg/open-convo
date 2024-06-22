import { createHash } from "crypto";

/**
 * Hashes the input password with a secret key from the server. This is used to
 * prevent rainbow table attacks. The secret key is stored in the environment
 * variables. The password is hashed using the SHA-256 algorithm and encoded in
 * hexadecimal.
 *
 * @param input - The password to hash.
 * @returns The hashed password.
 */
export function digestPassword(input: string): string {
  const peppered = input + process.env.SECRET_AUTH_KEY;
  const hashed = createHash("sha256").update(peppered).digest("hex");

  return hashed;
}
