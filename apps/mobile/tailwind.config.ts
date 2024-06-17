// @ts-expect-error - no types
import nativewind from 'nativewind/preset';
import type { Config } from 'tailwindcss';

//@ts-ignore
import * as baseConfig from '@repo/tailwind-config/tailwind.config.js';

export default {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ggRegular'],
        ggBlack: ['ggBlack'],
        ggBold: ['ggBold'],
        ggExtraBold: ['ggExtraBold'],
        ggExtraLight: ['ggExtraLight'],
        ggLight: ['ggLight'],
        ggMedium: ['ggMedium'],
        ggRegular: ['ggRegular'],
        ggSemiBold: ['ggSemiBold'],
        ggThin: ['ggThin'],
        ggItalic: ['ggItalic']
      }
    }
  }
} satisfies Config;
