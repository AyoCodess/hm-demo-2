import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserConfigState {
  currentSavedEmail: string;
  setCurrentSavedEmail: (email: string) => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  persist(
    (set, get) => ({
      setUserConfigStoreValues: (values: Partial<UserConfigState>) => {
        set(values);
      },

      currentSavedEmail: '',
      setCurrentSavedEmail: (currentSavedEmail) => {
        set({ currentSavedEmail });
      }
    }),
    {
      name: 'user-config',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
