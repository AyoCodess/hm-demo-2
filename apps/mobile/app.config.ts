import type { ExpoConfig } from '@expo/config';
import { theme } from './rawTheme';
const packageJson = require('./package.json');
const getBundleId = () => {
  if (process.env.APP_VARIANT === 'development') {
    return 'com.honeymoon.app';
  }
  if (
    process.env.APP_VARIANT === 'production' ||
    process.env.APP_VARIANT === 'staging'
  ) {
    return 'com.honeymoon.app';
  }
  return 'com.honeymoon.app';
};

const getAppName = () => {
  if (process.env.APP_VARIANT === 'development') {
    return 'Honeymoon (Dev)';
  }

  if (process.env.APP_VARIANT === 'staging') {
    return 'Honeymoon (Beta)';
  }

  if (process.env.EXPO_ENV === 'production') {
    return 'The Honeymoon App';
  }
  return 'The Honeymoon App';
};

const defineConfig = (): ExpoConfig => ({
  name: getAppName(),
  slug: 'honeymoon',
  scheme: 'repo',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  version: packageJson.version,
  experiments: {
    typedRoutes: true
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: theme.raw.colors.primary
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleId(),
    config: {
      usesNonExemptEncryption: false
    },
    infoPlist: {
      UIBackgroundModes: ['fetch', 'remote-notification'],
      NSFaceIDUsageDescription: 'Allow The Honeymoon App to use Face ID.'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: theme.raw.colors.primary
    },
    permissions: [],
    package: getBundleId(),
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? './google-services.json'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    eas: {
      projectId: '3e52cf18-0ec2-42e5-b827-c9597358b8f0'
    },
    supportsRTL: true
  },
  owner: 'ayocodes',
  updates: {
    url: 'https://u.expo.dev/3e52cf18-0ec2-42e5-b827-c9597358b8f0'
  },
  runtimeVersion: {
    policy: 'appVersion'
  },

  plugins: [
    ['expo-router'],
    [
      'expo-updates',
      {
        username: 'ayocodes',
        enabled: true
      }
    ],
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow $(The Honeymoon App) to use Face ID.'
      }
    ],
    ['expo-font'],
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        note: process.env.SENTRY_AUTH_TOKEN ?? 'sentry auth token error',
        project: 'the-honeymoon-app',
        organization: 'the-honeymoon-app'
      }
    ]

    // [
    // 	'expo-tracking-transparency',
    // 	{
    // 		userTrackingPermission:
    // 			'WP Appen requires user tracking to enable the time and location tracking functionality for business operations'
    // 	}
    // ]
  ]
});

export default defineConfig;
