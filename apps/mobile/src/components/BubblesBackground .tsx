import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const BubblesBackground = ({
  isDefault = true,
  secondaryBackgroundSvg = false,
  backgroundColor,
  zIndex = -1000000000
}: {
  secondaryBackgroundSvg?: boolean;
  isDefault?: boolean;
  zIndex?: number;
  backgroundColor?: string;
}) => {
  if (secondaryBackgroundSvg) {
    isDefault = false;
  }
  return (
    <>
      {isDefault && (
        <View
          style={{
            zIndex: zIndex,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColor || 'white'
          }}>
          <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
            {/*  //* Large bubbles */}
            <Circle
              cx={width * 0.3}
              cy={height * 0.3}
              r={width * 0.4}
              fill="rgba(254, 250, 235, 0.3)"
            />
            <Circle
              cx={width * 0.7}
              cy={height * 0.7}
              r={width * 0.5}
              fill="rgba(254, 250, 235, 0.7)"
            />
            {/* //* Small bubbles at the top */}
            <Circle
              cx={width * 0.1}
              cy={height * 0.1}
              r={width * 0.1}
              fill="rgba(254, 250, 235, 0.8)"
            />
            <Circle
              cx={width * 0.3}
              cy={height * 0.15}
              r={width * 0.08}
              fill="rgba(254, 250, 235, 0.6)"
            />
            <Circle
              cx={width * 0.5}
              cy={height * 0.1}
              r={width * 0.05}
              fill="rgba(254, 250, 235, 0.4)"
            />
            <Circle
              cx={width * 0.7}
              cy={height * 0.13}
              r={width * 0.07}
              fill="rgba(254, 250, 235, 0.7)"
            />
            {/*  //* Additional bubble at the top-right corner (25% smaller) */}
            <Circle
              cx={width * 0.9}
              cy={height * 0.1}
              r={width * 0.075}
              fill="rgba(254, 250, 235, 0.9)"
            />
            {/* //* Additional bubble */}
            <Circle
              cx={width * 0.2}
              cy={height * 0.8}
              r={width * 0.2}
              fill="rgba(254, 250, 235, 1)"
            />
          </Svg>
        </View>
      )}
      {secondaryBackgroundSvg && (
        <View
          style={{
            zIndex: zIndex,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColor || 'white'
          }}>
          <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
            {/* //* Large bubbles */}
            <Circle
              cx={width * 0.3}
              cy={height * 0.3}
              r={width * 0.4}
              fill="rgba(254, 250, 235, 0.3)"
            />
            <Circle
              cx={width * 0.7}
              cy={height * 0.7}
              r={width * 0.5}
              fill="rgba(254, 250, 235, 0.7)"
            />
            {/* //* Additional bubble at the top-right corner (25% smaller) */}
            <Circle
              cx={width * 0.9}
              cy={height * 0.1}
              r={width * 0.075}
              fill="rgba(254, 250, 235, 0.9)"
            />
            {/*  //* Additional bubble */}
            <Circle
              cx={width * 0.2}
              cy={height * 0.8}
              r={width * 0.2}
              fill="rgba(254, 250, 235, 1)"
            />
          </Svg>
        </View>
      )}
    </>
  );
};

export default BubblesBackground;
