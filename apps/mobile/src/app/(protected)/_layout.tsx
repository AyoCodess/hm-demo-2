import { useMomentStore } from '@/store/useMomentStore';
import { Octicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { theme } from 'rawTheme';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { bigShadow, mediumShadow } from '@/lib/utils/customCSS';
import { SheetManager } from 'react-native-actions-sheet';

import { AntDesign } from '@expo/vector-icons';

export default function Main() {
  const isCreatingMomentStatusBarLight = useMomentStore(
    (state) => state.isCreatingMomentStatusBarLight
  );

  const [isUserFeedbackModalVisible, setIsUserFeedbackModalVisible] =
    useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsUserFeedbackModalVisible(true);
        }}
        style={{
          ...bigShadow,
          borderRadius: 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: theme.raw.colors.lead,
          position: 'absolute',

          // top: 100,
          top: 92,
          left: 0,
          zIndex: 1000,
          paddingHorizontal: 12,
          paddingVertical: 8
        }}>
        {/* <Text className='text-offwhite-primary font-ggSemiBold'>F</Text> */}
        <AntDesign
          name="form"
          size={16}
          color={theme.raw.colors.offwhite.primary}
        />
      </TouchableOpacity>
      <StatusBar style={isCreatingMomentStatusBarLight ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleStyle: { color: theme.raw.colors.offwhite.primary },
          headerTintColor: theme.raw.colors.offwhite.primary,
          headerStyle: { backgroundColor: theme.raw.colors.primary }
        }}>
        <Stack.Screen
          // Name of the route to hide.
          name="(onboarding)/onboarding"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  );
}
