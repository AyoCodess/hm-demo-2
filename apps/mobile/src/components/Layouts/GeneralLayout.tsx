import { cn } from '@/lib/utils/cn';
import { theme } from 'rawTheme';
import React,{ ReactNode } from 'react';
import { ScrollView,ScrollViewProps,View,ViewProps } from 'react-native';

import BubblesBackground from '../BubblesBackground ';

interface GeneralLayoutProps extends ViewProps,ScrollViewProps {
  secondaryBackgroundSvg?: boolean;
  children: ReactNode;
  bg?: string;
  scroll?: boolean;
  ref?: any;
  onLayout?: any;
  noLayoutPadding?: boolean;
}

const GeneralLayout = React.forwardRef(
  (
    {
      secondaryBackgroundSvg = false,
      noLayoutPadding = false,
      children,
      bg,
      scroll = false,
      onLayout,
      ...props
    }: GeneralLayoutProps,
    ref
  ) => {
    return (
      <>
        {scroll && (
          <View style={{ flex: 1,position: 'relative' }}>
            {!bg && (
              <BubblesBackground
                secondaryBackgroundSvg={
                  secondaryBackgroundSvg ? secondaryBackgroundSvg : false
                }
              />
            )}
            <ScrollView
              ref={ref}
              onLayout={onLayout}
              {...props}
              className={cn(
                'flex-1 pr-4 pl-4 pb-16 bg-transparent ',
                bg ?? bg,
                {
                  'pr-0 pl-0': noLayoutPadding
                }
              )}>
              {children}
            </ScrollView>
          </View>
        )}
        {!scroll && (
          <View {...props} style={{ flex: 1,position: 'relative' }}>
            {!bg && (
              <BubblesBackground
                secondaryBackgroundSvg={
                  secondaryBackgroundSvg ? secondaryBackgroundSvg : false
                }
              />
            )}
            <View
              {...props}
              className={cn('flex-1 pr-4 pl-4 pb-16',bg ?? bg,{
                'pr-0 pl-0': noLayoutPadding
              })}>
              {children}
            </View>
          </View>
        )}
      </>
    );
  }
);

export default GeneralLayout;
