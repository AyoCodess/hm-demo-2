import { trigger } from 'react-native-haptic-feedback';
import { create } from 'zustand';

export interface BiometricsState {
  useBiometrics: boolean;
  setUseBiometrics: (value: boolean) => void;
  doesBiometricsNeedReAuthentication: boolean;
  setDoesBiometricsNeedReAuthentication: (value: boolean) => void;
  triggerBiometrics: boolean;
  setTriggerBiometrics: (value: boolean) => void;
}

export const useBiometricsStore = create<BiometricsState>((set) => ({
  useBiometrics: true,
  setUseBiometrics: (value: boolean) => {
    set({ useBiometrics: value });
  },
  doesBiometricsNeedReAuthentication: false,
  setDoesBiometricsNeedReAuthentication: (value: boolean) => {
    set({ doesBiometricsNeedReAuthentication: value });
  },
  triggerBiometrics: false,
  setTriggerBiometrics: (value: boolean) => {
    set({ triggerBiometrics: value });
  }
}));
