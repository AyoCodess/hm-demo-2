import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// utils

export type TUserObjectType = "individual" | "therapist";

export const validEmailSchema = z.object({
  email: z.string().email(),
});

export async function getClientEmail(req: Request) {
  let ErrorClientEmailResponse: Response | null = null;
  let hasClientEmail = false;
  let type: TUserObjectType = "individual";

  const userObject = await req.json();

  if (
    userObject &&
    typeof userObject === "object" &&
    "email" in userObject &&
    "type" in userObject
  ) {
    type = userObject.type;
    hasClientEmail = true;
  } else {
    ErrorClientEmailResponse = Response.json(
      {
        error: "No email provided",
      },
      { status: 400 },
    );
  }

  if (type !== "individual" && type !== "therapist") {
    hasClientEmail = false;
    ErrorClientEmailResponse = Response.json(
      {
        error: "Invalid type provided",
      },
      { status: 400 },
    );
  }

  return { userObject, ErrorClientEmailResponse, hasClientEmail };
}

export function validateClientEmail(email: string) {
  let ErrorValidateClientEmailResponse: Response | null = null;
  let isClientEmailValid = false;
  const { success: isEmail } = validEmailSchema.safeParse({ email });
  if (!isEmail) {
    ErrorValidateClientEmailResponse = Response.json(
      {
        error: "Invalid email address",
      },
      { status: 400 },
    );
  } else {
    isClientEmailValid = true;
  }

  return { isClientEmailValid, ErrorValidateClientEmailResponse };
}

export function checkClientApiKey(req: Request) {
  const clientApiKey = req.headers.get("authorization");
  let ErrorCheckClientApiKeyResponse: Response | null = null;
  let doesClientKeyMatch = false;

  if (!process.env.NEXT_PUBLIC_API_KEY) {
    ErrorCheckClientApiKeyResponse = Response.json(
      {
        error: "API key not set",
      },
      {
        status: 500,
      },
    );
    return { doesClientKeyMatch, ErrorCheckClientApiKeyResponse };
  }

  if (clientApiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    ErrorCheckClientApiKeyResponse = Response.json(
      {
        error: "Invalid API key",
      },
      {
        status: 401,
      },
    );
  } else {
    doesClientKeyMatch = true;
  }

  return { doesClientKeyMatch, ErrorCheckClientApiKeyResponse };
}

export async function checkRateLimit(clientID: string) {
  let passedRateLimitCheck = false;
  try {
    const { success } = await rateLimiter.limit(clientID);
    if (!success) {
      return {
        passedRateLimitCheck: false,
        ErrorRateLimitResponse: Response.json(
          {
            error: "Too many requests, please try again later",
          },
          {
            status: 429,
          },
        ),
      };
    } else {
      passedRateLimitCheck = true;
      return { passedRateLimitCheck, ErrorRateLimitResponse: null };
    }
  } catch (error) {
    console.error(error);
    return {
      passedRateLimitCheck: false,
      ErrorRateLimitResponse: Response.json(
        {
          error: "Something went wrong, contact support. Error code: 102",
        },
        { status: 500 },
      ),
    };
  }
}


const REQUESTS_PER_MINUTE = 3;
const WINDOW_SIZE = 120;

export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(REQUESTS_PER_MINUTE, `${WINDOW_SIZE} s`),
});
