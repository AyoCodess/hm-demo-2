// App.jsx
import { theme } from 'rawTheme';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { basicShadow, bigShadow } from './utils/customCSS';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        fontFamily: 'ggBold'
      }}
      contentContainerStyle={{}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  alertLong: (props: any) => (
    <BaseToast
      text2NumberOfLines={2}
      {...props}
      style={{
        fontFamily: 'ggRegular',
        borderLeftColor: theme.raw.colors.offwhite.primary,
        borderLeftWidth: 5,
        borderWidth: 5,
        borderColor: theme.raw.colors.offwhite.primary,
        height: 120,
        backgroundColor: theme.raw.colors.primary,
        color: theme.raw.colors.offwhite.primary,
        marginTop: 30,
        ...bigShadow
      }}
      text1Style={{
        fontFamily: 'ggBold',
        color: theme.raw.colors.lead,
        fontSize: 22
      }}
      text2Style={{
        fontFamily: 'ggRegular',
        color: theme.raw.colors.lead,
        fontSize: 18
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      text2NumberOfLines={100}
      {...props}
      style={{
        fontFamily: 'ggRegular',
        borderLeftColor: theme.raw.colors.offwhite.primary,
        borderLeftWidth: 5,
        borderWidth: 5,
        borderColor: theme.raw.colors.offwhite.primary,
        height: 800,
        backgroundColor: theme.raw.colors.primary,
        color: theme.raw.colors.offwhite.primary,
        marginTop: 5,
        ...bigShadow
      }}
      text1Style={{
        fontFamily: 'ggBold',
        color: theme.raw.colors.lead,
        fontSize: 22
      }}
      text2Style={{
        fontFamily: 'ggRegular',
        color: theme.raw.colors.lead,
        fontSize: 12
      }}
    />
  ),
  alertShort: (props: any) => (
    <BaseToast
      {...props}
      contentContainerProps={{}}
      style={{
        fontFamily: 'ggRegular',
        borderLeftColor: theme.raw.colors.offwhite.primary,
        borderColor: theme.raw.colors.offwhite.primary,
        backgroundColor: theme.raw.colors.primary,
        color: theme.raw.colors.offwhite.primary,
        borderLeftWidth: 5,
        borderWidth: 5,
        height: 90,
        marginTop: 30,
        ...bigShadow
      }}
      text1Style={{
        fontFamily: 'ggBold',
        color: theme.raw.colors.lead,
        fontSize: 22
      }}
      text2Style={{
        height: 0,
        fontFamily: 'ggBold',
        color: theme.raw.colors.lead,
        fontSize: 22
      }}
    />
  )

  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  // tomatoToast: ({ text1,props }: { text1: string,props: any }) => (
  //   <View style={{ height: 60,width: '100%',backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // )
};

/*
  2. Pass the config as prop to the Toast component instance */
