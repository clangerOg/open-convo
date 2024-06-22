import jwt, { JwtPayload } from "jsonwebtoken";

// This key must be present, as a check is made to ensure that all
// required keys are available when the server is started
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * Signs a JWT token.
 */
export function sign(
  payload: object | string,
  expiration: string | number | undefined,
): string {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiration,
  });
  return token;
}

/**
 * Verifies a token integrity by a secret key.
 */
export function verify(token: string): string | JwtPayload {
  const res = jwt.verify(token, JWT_SECRET);
  return res;
}
