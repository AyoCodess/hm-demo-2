import { bigShadow } from '@/lib/utils/customCSS';
import { useMomentStore } from '@/store/useMomentStore';
import { useAuth } from '@clerk/clerk-expo';
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useConvexAuth } from '@repo/api/core';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { theme } from 'rawTheme';
import React, { useEffect } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

export default function RootLayout() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isSignedIn, isLoaded } = useAuth();

  const pagerViewRef = useMomentStore((state) => state.pagerRefEvent);

  const setPagerViewRef = useMomentStore((state) => state.setPagerRefEvent);

  const isCreatingMoment = useMomentStore((state) => state.isCreatingMoment);
  const setIsCreatingMoment = useMomentStore(
    (state) => state.setIsCreatingMoment
  );

  const isCreatingMomentStatusBarLight = useMomentStore(
    (state) => state.isCreatingMomentStatusBarLight
  );

  const setIsCreatingMomentStatusBarLight = useMomentStore(
    (state) => state.setIsCreatingMomentStatusBarLight
  );

  const controlledPageViewKey = useMomentStore(
    (state) => state.controlledPageViewKey
  );

  const setControlledPageViewKey = useMomentStore(
    (state) => state.setControlledPageViewKey
  );

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const pathname = usePathname();

  const showDialog = () => {
    Alert.alert(
      'Hey Ayo!',
      'Are you sure you want to go back to home. You will loose all current progress.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Go Home',
          onPress: () => {
            console.log('ín dialogue', pagerViewRef.current as any);
            setControlledPageViewKey(controlledPageViewKey + 1);
            (pagerViewRef.current as any).setPage(0);
            router.replace('/(protected)/(tabs)/home');
            setIsCreatingMoment(false);
          }
        }
      ]
    );
  };

  /**
   * @description - This effect controls the statusbar color in create moment screen
   */
  useEffect(() => {
    if (pathname === '/createMoment') {
      setIsCreatingMomentStatusBarLight(false);
    } else {
      setIsCreatingMomentStatusBarLight(true);
      setIsCreatingMoment(false);
    }
  }, [pathname]);

  if (isLoading) {
    return <View />;
  }

  if (!isSignedIn) {
    router.replace('/sign-in');
  }

  return (
    <>
      <Tabs
        screenOptions={{
          // headerTransparent: true,

          headerRight: ({ pressColor, pressOpacity, tintColor }) => (
            <TouchableOpacity onPress={() => {}} className="py-2 pr-6">
              <FontAwesome5
                name="user-circle"
                size={24}
                color={theme.raw.colors.lead}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: 'ggRegular',
            color: theme.raw.colors.offwhite.primary
          },

          headerStyle: { backgroundColor: theme.raw.colors.primary },
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.raw.colors.lead,
          // tabBarActiveBackgroundColor: #63285',
          tabBarInactiveTintColor: theme.raw.colors.primary,
          // tabBarInactiveBackgroundColor: theme.raw.colors.offwhite.primary,
          tabBarInactiveBackgroundColor: 'transparent',
          // tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            // backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: '#F1F2F3',
            borderBottomWidth: 0,
            ...bigShadow,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20

            // backgroundColor: 'theme.raw.colors.primary ,
          }
        }}>
        <Tabs.Screen
          name="home"
          options={{
            href: '/(protected)/home',
            headerTitle: 'honeymoon',
            headerTitleStyle: {
              fontFamily: 'ggSemiBold',
              fontSize: 22,
              color: theme.raw.colors.offwhite.primary
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} className="py-2 pr-6">
                <FontAwesome5
                  name="user-circle"
                  size={24}
                  color={theme.raw.colors.offwhite.primary}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <View className="p-3">
                <Feather name="home" size={size} color={color} />
              </View>
            )
          }}
        />
      </Tabs>
    </>
  );
}
