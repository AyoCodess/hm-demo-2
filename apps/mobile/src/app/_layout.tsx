import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import { StatusBar } from 'expo-status-bar';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../../global.css';

import Toast from 'react-native-toast-message';

import 'react-native-get-random-values';
// import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,EXPO_PUBLIC_CONVEX_URL } from "@env";
import { toastConfig } from '@/lib/toastConfig';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk, ConvexReactClient } from '@repo/api/core';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

SplashScreen.preventAutoHideAsync();
// Prevent the splash screen from auto-hiding before App component is mounted

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
};

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

//?  eas update metadata - tag your scope with information about your update allows you to see errors happening on certain updates
const manifest = Updates.manifest;
const metadata = 'metadata' in manifest ? manifest.metadata : undefined;
const extra = 'extra' in manifest ? manifest.extra : undefined;
const updateGroup =
  metadata && 'updateGroup' in metadata ? metadata.updateGroup : undefined;

Sentry.init({
  dsn: 'https://dec4e8b1ee8266643581ab96037619f1@o4507328272203776.ingest.de.sentry.io/4507329416396880',
  // debug: true,
  attachScreenshot: true,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0
  },
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo()
      // ...
    })
  ]
});

Sentry.configureScope((scope) => {
  scope.setTag('expo-update-id', Updates.updateId);
  scope.setTag('expo-is-embedded-update', Updates.isEmbeddedLaunch);

  if (typeof updateGroup === 'string') {
    scope.setTag('expo-update-group-id', updateGroup);

    const owner = extra?.expoClient?.owner ?? '[account]';
    const slug = extra?.expoClient?.slug ?? '[project]';
    scope.setTag(
      'expo-update-debug-url',
      `https://expo.dev/accounts/${owner}/projects/${slug}/updates/${updateGroup}`
    );
  } else if (Updates.isEmbeddedLaunch) {
    // This will be `true` if the update is the one embedded in the build, and not one downloaded from the updates server.
    scope.setTag(
      'expo-update-debug-url',
      'not applicable for embedded updates'
    );
  }
});

function Root() {
  if (
    !process.env.EXPO_PUBLIC_CONVEX_URL ||
    !process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  )
    throw new Error('CONVEX_URL and CLERK_PUBLISHABLE_KEY must be set.');

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
    unsavedChangesWarning: false
    // verbose: true,
  });

  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  React.useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SheetProvider>
            <Slot />
          </SheetProvider>
        </GestureHandlerRootView>
        <Toast config={toastConfig} visibilityTime={4000} />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default Sentry.wrap(Root);
