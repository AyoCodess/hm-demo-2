import { theme } from 'rawTheme';
import React from 'react';
import Svg,{ Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width,height } = Dimensions.get('window');

export default function BackgroundSvg({
  small = false
}: {
  small?: boolean;
}) {
  return (
    <Svg style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1000
    }} height={height} width={width}>
      {!small && <Polygon points={`0,0 ${width},0 ${width},${height * 0.55} 0,${height * 0.65}`} fill={theme.raw.colors.primary} />}
      {small && <Polygon points={`0,0 ${width},0 ${width},${height * 0.25} 0,${height * 0.35}`} fill={theme.raw.colors.primary} />}
    </Svg>
  );
}


