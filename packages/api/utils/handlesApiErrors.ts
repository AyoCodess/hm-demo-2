import { isClerkAPIResponseError } from '@clerk/clerk-js';
import { ConvexError } from 'convex/values';

export default function handleApiErrors({
  err,
  location
}: {
  err: unknown;
  location: string;
}) {
  console.error(`Error at ${location}`);
  console.error(JSON.stringify(err, null, 2));
  if (isClerkAPIResponseError(err)) {
    const errors = err.errors;
    if (errors?.length > 0) {
      console.error(
        `Clerk Error: ${errors[0]?.longMessage ? errors[0]?.longMessage : errors[0]?.message}`
      );
      return;
    }
  }

  const errorMessage =
    // Check whether the error is an application error
    err instanceof ConvexError
      ? // Access data and cast it to the type we expect
        `Convex Error: ${(err.data as { message: string }).message}`
      : // Must be some developer error,
        // and prod deployments will not
        // reveal any more information about it
        // to the client
        'Standard Application Unexpected error occurred';
  // do something with `errorMessage`
  console.error(`Error - ${errorMessage}`);
  return errorMessage;
}
