import z from "zod";
import { TResponse } from "./types";

export const validEmailSchema = z.object({
  email: z.string().email(),
});

export  function validateClientEmail(email: string) {
  let responseValidateClientEmail: TResponse;

  const { success: isEmail } = validEmailSchema.safeParse({ email });
  if (!isEmail) {
    responseValidateClientEmail = {
      isSuccess: false,
      message: "Invalid email address",
    };
  } else {
    responseValidateClientEmail = {
      isSuccess: true,
      message: "success",
    };
  }

  return { responseValidateClientEmail };
}
