import { useAuth, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import Svg, { Polygon } from 'react-native-svg';

// import { EXPO_PUBLIC_E_LIST } from '@env';

import { useAuthenticateWithBiometrics } from '@/hooks/useAuthenticateWithBiometrics';
import { IS_ANDROID, IS_IOS } from '@/lib/utils/platform';
import { useBiometricsStore } from '@/store/useBiometricsStore';
import { useUserConfigStore } from '@/store/useUserConfigStore';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useConvexAuth } from '@repo/api/core';
import { SplashScreen, router } from 'expo-router';
import { theme } from 'rawTheme';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

import { useCheckForUpdates } from '@/hooks/useCheckForUpdates';
import packageJson from '../../../package.json';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BackgroundSvg from '@/components/BackgroundSVG';
import { PrimaryButton } from '@/components/PrimaryButton';
import Modal from 'react-native-modal/dist/modal';
import { mediumShadow } from '@/lib/utils/customCSS';

const LoginSchema = z.object({
  emailAddress: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string()
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginScreen() {
  (async () => {
    await SplashScreen.hideAsync();
  })();

  // useCheckForUpdates();

  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch ? 'BC' : 'U';

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();

  const doesBiometricsNeedReAuthentication = useBiometricsStore(
    (state) => state.doesBiometricsNeedReAuthentication
  );
  const setDoesBiometricsNeedReAuthentication = useBiometricsStore(
    (state) => state.setDoesBiometricsNeedReAuthentication
  );

  const triggerBiometrics = useBiometricsStore(
    (state) => state.triggerBiometrics
  );

  const setTriggerBiometrics = useBiometricsStore(
    (state) => state.setTriggerBiometrics
  );

  //******************* */ is triggered by onSignInPress being successful and handles re-directs
  useAuthenticateWithBiometrics({
    isSignedIn,
    isLoaded
  });

  useEffect(() => {
    if (doesBiometricsNeedReAuthentication) {
      setTriggerBiometrics(false);
    }
  }, [doesBiometricsNeedReAuthentication]);

  // console.log('E_LIST', process.env.EXPO_PUBLIC_E_LIST);

  const currentSavedEmail = useUserConfigStore(
    (state) => state.currentSavedEmail
  );
  const setCurrentSavedEmail = useUserConfigStore(
    (state) => state.setCurrentSavedEmail
  );

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailAddress: currentSavedEmail ? currentSavedEmail : '',
      password: ''
    }
  });

  const { handleSubmit, register } = methods;

  register('emailAddress', {
    onChange(event) {
      setCurrentSavedEmail(event.target.value);
    }
  });

  useWarmUpBrowser();

  const [signInWithModalVisible, setSignInWithModalVisible] = useState(false);

  const { startOAuthFlow: startGoogleOauth } = useOAuth({
    strategy: 'oauth_google',
    redirectUrl: 'exp://172.20.10.3:8081'
  });

  const { startOAuthFlow: startAppleOauth } = useOAuth({
    strategy: 'oauth_apple',
    redirectUrl: 'exp://172.20.10.3:8081'
  });

  const handleSignUpWithGooglePress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOauth();

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          '2. There are unmet requirements, modify this else to handle them'
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log('error signing in', err);
    }
  }, [startGoogleOauth]);

  const handleSignUpWithApplePress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleOauth();
      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          '4. There are unmet requirements, modify this else to handle them'
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log('error signing in', err);
    }
  }, [startAppleOauth]);

  const [loading, setLoading] = React.useState(false);

  // start the sign up process
  async function onSignInPress() {
    router.push('/(protected)/(tabs)/home');
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <BackgroundSvg />

      <View className="flex-1 mt-28">
        <View className="gap-2 px-10   ">
          <Text className="text-center font-ggRegular text-offwhite-primary text-2xl">
            The Honeymoon App
          </Text>
          <Text
            style={{
              fontSize: 58
            }}
            className=" text-offwhite-primary mt-14 font-ggSemiBold ">
            Get Wired For Lasting Love
          </Text>

          {/* <View>
            <Button
              title="Login with Google"
              onPressHandler={handleSignUpWithGooglePress}
            />
            {Platform.OS === "ios" && (
              <Button
                title="Login with Apple"
                onPressHandler={handleSignUpWithApplePress}
              />
            )}
          </View> */}
          {/* <View className="max-w-lg flex-row items-center gap-4">
            <View className="h-[1px] flex-1 bg-slate-200" />
            <Text>or</Text>
            <View className="h-[1px] flex-1 bg-slate-200" />
          </View> */}
          {/* </View> */}
        </View>
        <View className="mt-[60%]">
          <TouchableOpacity
            style={{
              ...mediumShadow,
              borderRadius: 40,
              backgroundColor: theme.raw.colors.primary,
              padding: 10,
              margin: 20
            }}
            onPress={() => {
              onSignInPress();
            }}>
            <Text className="text-2xl text-center text-white font-ggSemiBold">
              Sign in with Email
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex gap-2">
          <Text className="text-lead text-sm text-center px-10">
            By tapping sign in you agree to our terms and conditions. Please
            review them before continuing
          </Text>
          <Text className="text-lead text-center text-sm mb-2 font-ggRegular rounded-md ">
            v{packageJson.version} ({packageJson.updateVersion}){' '}
            {runTypeMessage}{' '}
          </Text>
        </View>
      </View>

      <SignInWithEmailModal
        setSignInWithModalVisible={setSignInWithModalVisible}
        signInWithModalVisible={signInWithModalVisible}
        onClose={() => {
          setSignInWithModalVisible(false);
        }}>
        <FormProvider {...methods}>
          <View className=" ">
            <View className="max-w-lg gap-4 mb-4"></View>
            {!doesBiometricsNeedReAuthentication && (
              <>
                <TouchableOpacity
                  style={{
                    ...mediumShadow,
                    borderRadius: 40
                  }}
                  className="bg-secondary px-3 py-3 mt-4 flex-row  items-center justify-center rounded-md"
                  onPress={handleSubmit(onSignInPress)}>
                  <Text className="mr-2 text-xl font-ggRegular">Sign in</Text>
                  {loading && <ActivityIndicator size="small" color="black" />}
                </TouchableOpacity>
              </>
            )}
            {doesBiometricsNeedReAuthentication && (
              <TouchableOpacity
                className="bg-white px-3 py-3 flex-row  items-center justify-center rounded-md"
                onPress={() => {
                  setTriggerBiometrics(!triggerBiometrics);
                  setDoesBiometricsNeedReAuthentication(false);
                }}>
                <Text className="mr-2 font-ggRegular">
                  Try again with biometrics
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </FormProvider>
      </SignInWithEmailModal>
    </View>
  );
}

function SignInWithEmailModal({
  signInWithModalVisible,
  setSignInWithModalVisible,
  onClose,
  children
}: {
  signInWithModalVisible: boolean;
  setSignInWithModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal
      avoidKeyboard={true}
      style={{}}
      backdropOpacity={IS_IOS ? 0.25 : 0}
      onBackdropPress={() => {
        // setIsChangeDetailsModalVisible(false);
      }}
      onSwipeComplete={() => {
        // setIsChangeDetailsModalVisible(false);
      }}
      animationIn="slideInUp"
      isVisible={signInWithModalVisible}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexGrow: 1,
          backgroundColor: theme.raw.colors.offwhite.primary,
          maxHeight: 320,
          borderRadius: 16,
          padding: 20
        }}>
        <View
          style={{
            flexGrow: 1
          }}>
          <View>{children}</View>
          <View className="w-full mt-auto">
            <TouchableOpacity className="mx-auto" onPress={onClose}>
              <Text className="text-primary text-lg text-center w-20 font-ggRegular">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
