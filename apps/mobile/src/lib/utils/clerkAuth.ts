import { EmailAddressResource, UserResource } from '@clerk/types';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { handleClerkErrorAndOthers } from './handleClerkErrorAndOthers';
import React from 'react';
import { set } from 'react-hook-form';

/**
 * @description This function finds all the email addresses that have a status of verified equalling to null
 * @param emailAddresses
 * @returns  EmailAddressResource[]
 */
export function findUnverifiedEmailAddresses(
  emailAddresses: EmailAddressResource[] | undefined
): EmailAddressResource[] {
  if (!emailAddresses) {
    return [];
  }
  const unverifiedEmailAddresses = emailAddresses.filter(
    (emailAddress) =>
      emailAddress.verification.status === null ||
      emailAddress.verification.status === 'unverified'
  );

  return unverifiedEmailAddresses;
}

/**
 * @description This function destroys all the email addresses that have a status of verified equalling to null
 * @param unverifiedEmailAddresses
 * @returns  Promise<string> | []
 */
export async function destroyUnverifiedEmailAddresses(
  unverifiedEmailAddresses: EmailAddressResource[] | undefined
): Promise<string | null> {
  if (!unverifiedEmailAddresses) {
    Alert.alert('101 Error', 'There was an error. Please try again.');
    return null;
  }
  for (const emailAddress of unverifiedEmailAddresses) {
    try {
      const res = await emailAddress.destroy();
      console.log('res:', JSON.stringify(res, null, 2));
      console.log('all unverified email addresses destroyed');
      return 'all unverified email addresses destroyed';
    } catch (err) {
      console.error('CRITICAL ERROR', JSON.stringify(err, null, 2));
    }
  }

  return null;
}

export async function handleCreateNewEmailAndSendCode({
  newEmail,
  setInTransition,
  user,
  setIsEmailVerificationPending,
  setCurrentUnverifiedEmail
}: {
  setInTransition?: React.Dispatch<React.SetStateAction<boolean>>;
  newEmail: string | null;
  user: UserResource;

  setIsEmailVerificationPending: (value: boolean) => void;
  setCurrentUnverifiedEmail: (value: EmailAddressResource) => void;
}) {
  let unverifiedEmail: EmailAddressResource | null = null;
  try {
    if (newEmail === null) {
      Alert.alert('3 Error', 'There was an error. Please try again.');
      return;
    }

    const res = await user.createEmailAddress({
      email: newEmail
    });

    if (!res) {
      Alert.alert('1 Error', 'There was an error. Please try again.');
      return;
    }

    await user.reload();

    const unverifiedEmailFound = user?.emailAddresses.find(
      (a) => a.id === res.id
    );

    if (!unverifiedEmailFound) {
      Alert.alert('2 Error', 'There was an error. Please try again.');
      return;
    }

    setIsEmailVerificationPending(true);
    if (setInTransition) {
      setInTransition(false);
    }
    unverifiedEmail = unverifiedEmailFound;
    setCurrentUnverifiedEmail(unverifiedEmailFound);

    await unverifiedEmail?.prepareVerification({
      strategy: 'email_code'
    });
  } catch (err) {}
}

export async function handleResendCode({
  currentUnverifiedEmail
}: {
  currentUnverifiedEmail: EmailAddressResource;
}) {
  if (!currentUnverifiedEmail) {
    Alert.alert('Error', 'There was an error. Please try again.');
    return;
  }

  try {
    const res = await currentUnverifiedEmail.prepareVerification({
      strategy: 'email_code'
    });

    if (!res) {
      Alert.alert('Error', 'There was an error. Please try again.');
      return;
    }

    Toast.show({
      type: 'alertLong',
      text1: 'Resent code',
      text2: 'Please check your email for the code.'
    });
  } catch (err) {
    console.error('CRITICAL ERROR', JSON.stringify(err, null, 2));
    Alert.alert('Error', 'Please try again later.');
  }
}

export async function verifyEmailWithCode({
  user,
  currentUnverifiedEmail,
  code
}: {
  user: UserResource;
  currentUnverifiedEmail: EmailAddressResource;
  code: string;
}) {
  if (!currentUnverifiedEmail) {
    return {
      success: false,
      emailResource: null
    };
  }

  try {
    const res = await currentUnverifiedEmail.attemptVerification({ code });

    const isSuccess = res.verification.status === 'verified';
    return {
      success: isSuccess,
      emailResource: isSuccess ? res : null
    };
  } catch (err) {
    return {
      success: false,
      emailResource: null
    };
  }
}

export async function confirmNewPrimaryAddressAndDestroyOthers({
  user,
  emailResource
}: {
  user: UserResource;
  emailResource: EmailAddressResource;
}) {
  if (!emailResource) {
    Alert.alert('Error', 'There was an error. Please try again.');
    return {
      success: false,
      user: null
    };
  }

  try {
    const res = await user.update({
      primaryEmailAddressId: emailResource.id
    });

    const isSuccess = res.primaryEmailAddressId === emailResource.id;

    if (isSuccess) {
      await user.reload();

      const otherEmailAddresses = user.emailAddresses.filter(
        (email) => email.id !== emailResource.id
      );

      for (const email of otherEmailAddresses) {
        await email.destroy();
      }
    } else {
      console.error('email match error');
    }

    return {
      success: isSuccess,
      user: isSuccess ? res : null
    };
  } catch (err) {
    Alert.alert('Error', 'There was an error. Please try again.');
    console.error('3 CRITICAL ERROR', JSON.stringify(err, null, 2));
    return {
      success: false,
      user: null
    };
  }
}
