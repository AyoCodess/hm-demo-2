import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { SplashScreen, useRouter } from 'expo-router';
import { wait } from '@/lib/utils/wait';
import { useUserConfigStore } from '@/store/useUserConfigStore';
import { set } from 'react-hook-form';
import { useBiometricsStore } from '@/store/useBiometricsStore';
import { on } from 'events';

export function useAuthenticateWithBiometrics({
  isAuthenticated,
  isSignedIn,
  isLoaded
}: {
  isAuthenticated?: boolean;
  isSignedIn: boolean | undefined;
  isLoaded: boolean | undefined;
}) {
  //TODO  get this boolean from the backend
  const [isOnboarded, setIsOnboarded] = useState(true);
  const router = useRouter();
  const doesBiometricsNeedReAuthentication = useBiometricsStore(
    (state) => state.doesBiometricsNeedReAuthentication
  );
  const setDoesBiometricsNeedReAuthentication = useBiometricsStore(
    (state) => state.setDoesBiometricsNeedReAuthentication
  );

  const triggerBiometrics = useBiometricsStore(
    (state) => state.triggerBiometrics
  );

  const useBiometrics = useBiometricsStore((state) => state.useBiometrics);
  const setUseBiometrics = useBiometricsStore(
    (state) => state.setUseBiometrics
  );

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      setUseBiometrics(true);
      try {
        // Check if hardware supports biometrics
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
        if (!compatible) {
          console.warn(
            'Biometric authentication is not available on this device.'
          );
        }

        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate',
          requireConfirmation: false,
          fallbackLabel: 'Enter Passcode',
          disableDeviceFallback: false,
          cancelLabel: 'Cancel'
        });

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (isEnrolled) {
          if (result && result.success) {
            if (isOnboarded) {
              setDoesBiometricsNeedReAuthentication(false);
              return;
            } else {
              setDoesBiometricsNeedReAuthentication(false);
              return;
            }
          }
        } else {
          // console.log('User has not enrolled in biometrics.');
          if (isOnboarded) {
            setDoesBiometricsNeedReAuthentication(false);

            return;
          } else {
            setDoesBiometricsNeedReAuthentication(false);
            return;
          }
        }

        if (result && result.error) {
          console.error(result.error);
        }
        console.log('Failed to authenticate');
        setDoesBiometricsNeedReAuthentication(true);
      } catch (err) {
        console.error(err);
      }
    };

    const init = async () => {
      if (!isLoaded) {
        return;
      }

      if (isSignedIn) {
        // console.log('user has a valid token and can use biometrics to sign in');
        authenticate();
      } else {
        console.log('user is not signed in');
        return;
      }
    };

    init();
  }, [isSignedIn, triggerBiometrics]);

  return {
    isBiometricSupported
  };
}
