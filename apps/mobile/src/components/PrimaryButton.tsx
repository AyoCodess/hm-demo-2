import { cn } from '@/lib/utils/cn';
import { basicShadow } from '@/lib/utils/customCSS';
import { Feather } from '@expo/vector-icons';
import { theme } from 'rawTheme';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function PrimaryButton({
  shadow = true,
  rounded = 'rounded-3xl',
  bg,
  onPress,
  children,
  iconBack = false,
  iconNext = false,
  color = theme.raw.colors.lead,
  secondary = false,
  type = null
}: {
  onPress: () => void;
  shadow?: boolean;
  rounded?: string;
  bg?: string;
  children: ReactNode;
  iconNext?: boolean;
  iconBack?: boolean;
  color?: string;
  secondary?: boolean;
  type?: 'red' | 'blue' | null;
  selected?: boolean;
}) {
  const isShadow = shadow ? basicShadow : null;
  return (
    <TouchableOpacity
      style={{
        ...isShadow
      }}
      onPress={onPress}
      className={cn(
        ' rounded-md justify-center px-3 py-2 ',
        secondary && type === 'red' ? 'bg-primeRed-400 ' : '',
        secondary && type === 'blue' ? 'bg-blue-400 ' : '',
        bg ? bg : 'bg-white',
        rounded && rounded
      )}>
      {iconBack && !iconNext && !secondary && !type && (
        <View className="flex-row gap-3  justify-center items-center">
          <Feather name="chevron-left" size={20} color={color} />
          <Text
            style={{
              color: color
            }}
            className="text-xl pr-2 text-center font-ggSemiBold">
            {children}
          </Text>
        </View>
      )}
      {!iconBack && iconNext && !secondary && !type && (
        <View className="flex-row gap-3 justify-center items-center">
          <Text
            style={{
              color: color
            }}
            className=" text-xl  pl-2 text-center font-ggSemiBold">
            {children}
          </Text>
          <Feather name="chevron-right" size={20} color={color} />
        </View>
      )}
      {!iconBack && !iconNext && !secondary && !type && (
        <Text
          style={{
            color: color
          }}
          className="text-xl flex-row gap-4 text-center font-ggSemiBold">
          {children}
        </Text>
      )}
      {/* {!iconBack && !iconNext && secondary && type && (
        <Text
          style={{
            color: theme.raw.colors.offwhite.primary
          }}
          className="text-xl flex-row gap-4 text-center font-ggSemiBold">
          {children}
        </Text>
      )} */}
    </TouchableOpacity>
  );
}
