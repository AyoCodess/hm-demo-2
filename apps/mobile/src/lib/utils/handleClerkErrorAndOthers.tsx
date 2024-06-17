import { Alert } from 'react-native';
import { isClerkAPIResponseError } from '@clerk/clerk-js';
import * as Sentry from '@sentry/react-native';

export function handleClerkErrorAndOthers({
  rawError,
  showLocationToUser = false,
  err,
  errorNumber,
  location
}: {
  rawError: unknown;
  showLocationToUser?: boolean;
  err: unknown;
  errorNumber: number;
  location: string;
}) {
  console.error(`Dev Error at ${location}`);
  console.error('Raw Error:', JSON.stringify(rawError, null, 2));
  Sentry.captureException(err);
  if (err && typeof err === 'object' && isClerkAPIResponseError(err)) {
    const errors = err.errors;
    if (errors?.length > 0) {
      Alert.alert(
        ` Error (${errorNumber})`,
        errors[0]?.longMessage ? errors[0]?.longMessage : errors[0]?.message
      );
    }
  } else {
    Alert.alert(
      `Standard Error (${errorNumber})`,
      `${location && showLocationToUser ? 'at' : ''} ${location && showLocationToUser} ${location && showLocationToUser ? '-' : ''} Try again or Contact Support.`
    );
  }
}
