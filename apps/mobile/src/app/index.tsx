import { SplashScreen, useRouter } from 'expo-router';
import { View } from 'react-native';

import '../../global.css';

// import {
//   useFonts,
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   Inter_900Black,

// } from '@expo-google-fonts/inter';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { set } from 'react-hook-form';

const StartPage = () => {
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    ggBlack: require('../../assets/fonts/GalanoGrotesqueAltBlack.otf'),
    ggBold: require('../../assets/fonts/GalanoGrotesqueAltBold.otf'),
    ggExtraBold: require('../../assets/fonts/GalanoGrotesqueAltExtraBold.otf'),
    ggExtraLight: require('../../assets/fonts/GalanoGrotesqueAltExtraLight.otf'),
    ggLight: require('../../assets/fonts/GalanoGrotesqueAltLight.otf'),
    ggMedium: require('../../assets/fonts/GalanoGrotesqueAltMedium.otf'),
    ggRegular: require('../../assets/fonts/GalanoGrotesqueAltRegular.otf'),
    ggSemiBold: require('../../assets/fonts/GalanoGrotesqueAltSemiBold.otf'),
    ggThin: require('../../assets/fonts/GalanoGrotesqueAltThin.otf'),
    ggItalic: require('../../assets/fonts/GalanoGrotesqueAltItalic.otf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // console.log('fonts loaded:', JSON.stringify(fontsLoaded, null, 2));
      // console.log('fonts error:', JSON.stringify(fontError, null, 2));

      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);

      router.replace('/sign-in');
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <View />
    </View>
  );
};

export default StartPage;
