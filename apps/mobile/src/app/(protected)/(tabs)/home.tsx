import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';

import { useCheckForUpdates } from '@/hooks/useCheckForUpdates';
import { theme } from 'rawTheme';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect';

export default function Home() {
  const router = useRouter();
  useCheckForUpdates();

  /**
   * @description - //? This effect checks the user's identity and stores the user id in the state
   */
  useStoreUserEffect();

  const scrollRef = useRef(null);

  const onLayout = useCallback(() => {
    (scrollRef.current as any).scrollTo({
      y: 0,
      animated: true
    });
  }, []);

  const translateYValue = 20;

  //* ANIMATIONS
  const translateY = useSharedValue(translateYValue);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      height: 530
    };
  });

  useFocusEffect(onLayout);
  useFocusEffect(
    useCallback(() => {
      // This effect will run every time the screen gains focus
      translateY.value = withSpring(0, {
        damping: 10, // Lower damping for more bounce
        stiffness: 50, // Higher stiffness for faster animation
        mass: 1.5 // Increase mass for a slower animation });
      });
      return () => {
        // Reset animation value if needed when losing focus
        translateY.value = translateYValue;
      };
    }, [])
  );

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.raw.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
