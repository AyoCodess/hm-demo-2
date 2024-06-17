import { TUserObjectType } from "./types";

export async function getClientEmail({
  email,
  type,
}: {
  email: string;
  type: TUserObjectType;
}) {
  let ErrorClientEmailResponse: {} | null = null;
  let hasClientEmail = false;

  if (email && type) {
    hasClientEmail = true;
  } else {
    ErrorClientEmailResponse = {
      error: "No email provided",

      status: 400,
    };
  }

  const userObject = {
    email,
    type,
  };

  return { userObject, ErrorClientEmailResponse, hasClientEmail };
}
