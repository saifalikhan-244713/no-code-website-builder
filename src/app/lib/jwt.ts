import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "supersecret";

export const signToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "7d" as unknown as SignOptions["expiresIn"]
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET as jwt.Secret, options);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET as jwt.Secret);
  } catch (err) {
    return null;
  }
};
