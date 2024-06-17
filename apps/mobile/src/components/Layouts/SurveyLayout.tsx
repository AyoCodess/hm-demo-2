import { cn } from '@/lib/utils/cn';
import { Feather } from '@expo/vector-icons';
import { theme } from 'rawTheme';
import React,{ ReactNode } from 'react';
import { Alert,Dimensions,Text,TouchableOpacity,View } from 'react-native';
import BubblesBackground from '../BubblesBackground ';

const { height } = Dimensions.get('window');
/**
 * 
 * @description This component is used to create a layout for the survey/onboarding screens. Child components should not use flex-1 as it will distort the layout
 
 */
export default function SurveyLayout({
  height,
  banner = null,
  bannerPlaceHolder = false,
  header,
  bottomButtons,
  body,
  props,
  centerBody = false,
  bottomButtonsPadding = 'pb-16'
}: {
  height?: number;
  banner?: JSX.Element | null;
  bannerPlaceHolder?: boolean;
  header: JSX.Element | null;
  bottomButtons: JSX.Element | null;
  body: JSX.Element | null;
  centerBody?: boolean;
  props?: any;
  bottomButtonsPadding?: string;
}) {
  return (
    <View
      style={{
        height: height ? height : 'auto',
        position: 'relative'
      }}
      {...props}
      className={cn('flex-1 px-6 bg-white ')}>
      <BubblesBackground secondaryBackgroundSvg />
      {banner && <View className={cn('mt-4')}>{banner}</View>}
      {bannerPlaceHolder && (
        <View
          style={{
            height: 38.666672
          }}
        />
      )}
      <View className=" mt-8 ">{header}</View>
      <View
        className={cn('mt-auto mb-6',{
          'flex-1 mt-0': centerBody
        })}>
        {body}
      </View>
      <View className={`${bottomButtonsPadding}`}>{bottomButtons}</View>
    </View>
  );
}

SurveyLayout.BottomButtonsPlaceholder = function BottomButtonsPlaceholder() {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 40,
        height: 40
      }}
    />
  );
};
SurveyLayout.Header = function Header({
  alertTitle = null,
  alertMessage = null,
  text,
  icon = true,
  iconRightMargin = '',
  textClass = ''
}: {
  alertTitle?: string | null;
  alertMessage?: string | null;
  text: string;
  icon?: boolean;
  iconRightMargin?: string;
  textClass?: string;
}) {
  return (
    <View>
      {alertMessage && alertTitle && (
        <TouchableOpacity
          onPress={() => {
            if (alertTitle && alertMessage) {
              Alert.alert(alertTitle,alertMessage);
            }
          }}
          className="flex-row justify-center gap-2 p-4 ">
          <Text
            className={cn(
              `font-ggSemiBold text-3xl text-center ${textClass}`,
              icon && 'mr-4 text-left'
            )}>
            {text}
          </Text>
          {icon && (
            <View className={cn(`mt-1  ${iconRightMargin}`,{})}>
              <Feather name="info" size={20} color={theme.raw.colors.primary} />
            </View>
          )}
        </TouchableOpacity>
      )}
      {!alertMessage && !alertTitle && (
        <View className="flex-row justify-between  gap-2 p-4">
          <Text
            className={cn(
              `font-ggSemiBold text-3xl text-left  ${textClass}`,
              icon && 'mr-4 text-left'
            )}>
            {text}
          </Text>
          {icon && (
            <View className={cn(`mt-1  ${iconRightMargin}`,{})}>
              <Feather name="info" size={20} color={theme.raw.colors.primary} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

SurveyLayout.HeaderBase = function HeaderBase({
  className = '',
  text
}: {
  className?: string;
  text: string;
}) {
  return (
    <View>
      <View
        className={cn(`flex-row justify-between p-4`,{
          [className]: className
        })}>
        <Text className="font-ggSemiBold text-3xl text-left">{text}</Text>
      </View>
    </View>
  );
};

/**
 * @description for center body to work, child component needs flex-1 & justify-center
 */
SurveyLayout.Body = function ({
  children,
  centerBody = false,
  classNames = null
}: {
  children: ReactNode;
  centerBody?: boolean;
  classNames?: string | null;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 6
      }}
      className={cn(
        ` items-center flex-col justify-center  gap-6 ${classNames} `,
        {
          'flex-1': centerBody
        }
      )}>
      {children}
    </View>
  );
};

SurveyLayout.CustomHeader = function ({ children }: { children: ReactNode }) {
  return <View className="px-2  ">{children}</View>;
};

SurveyLayout.OneBottomButton = function ({
  children,
  next = false
}: {
  children: ReactNode;
  next?: boolean;
}) {
  return (
    <>
      {!next && <View className="mr-auto">{children}</View>}
      {next && <View className="ml-auto">{children}</View>}
    </>
  );
};

SurveyLayout.TwoBottomButtons = function ({
  children
}: {
  children: ReactNode;
}) {
  return <View className="flex-row w-full justify-between ">{children}</View>;
};
