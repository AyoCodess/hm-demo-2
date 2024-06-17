import { cn } from '@/lib/utils/cn';
import { removeContents } from '@expo/config-plugins/build/utils/generateCode';
import { relative } from 'path';
import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-actions-sheet';

const { height } = Dimensions.get('window');

export default function MomentLayout({
  banner = null,
  header,
  buttons,
  reduceTopMargin,
  children,
  props,
  dividePadding = 100,
  removeContentGap = false
}: {
  banner?: JSX.Element | null;
  header: JSX.Element | null;
  buttons: JSX.Element | null;
  reduceTopMargin?: boolean;
  children: ReactNode;
  props?: any;
  dividePadding?: number;
  removeContentGap?: boolean;
}) {
  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        width: '100%'
      }}
      {...props}
      className={cn('px-8 bg-white')}>
      {banner && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: 0
          }}
          className="gap-4">
          {banner}
        </View>
      )}
      <View className="mt-20 items-center">{header}</View>
      <View
        style={{
          flex: 1,
          paddingTop: dividePadding
        }}
        className={cn('bg-white', {
          'gap-10': !removeContentGap
        })}>
        {children}
      </View>
      <View className="pb-16">{buttons}</View>
    </View>
  );
}
