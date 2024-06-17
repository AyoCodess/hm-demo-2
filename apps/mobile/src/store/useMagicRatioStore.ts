import { create } from 'zustand';

export type MagicRatioState = {
  blueCount: number;
  redCount: number;
  targetRatio: number;
  currentRatio: number;
  remainingBlue: number;
  progress: number;
  setBlueCount: (blueCount: number) => void;
  setRedCount: (redCount: number) => void;
};
export const useMagicRatioStore = create<MagicRatioState>((set, get) => {
  return {
    blueCount: 0,
    redCount: 0,
    targetRatio: 20,
    currentRatio: 0,
    remainingBlue: 0,
    progress: 0,
    setBlueCount: (blueCount) => {
      set((state) => {
        const currentRatio = blueCount / state.redCount;
        const progress = currentRatio / state.targetRatio;
        const remainingBlue = state.targetRatio * state.redCount - blueCount;
        return {
          ...state,
          blueCount,
          currentRatio,
          remainingBlue,
          progress
        };
      });
    },
    setRedCount: (redCount) => {
      set((state) => {
        const currentRatio = state.blueCount / redCount;
        const remainingBlue = state.targetRatio * redCount - state.blueCount;
        const progress = currentRatio / state.targetRatio;
        return {
          ...state,
          redCount,
          currentRatio,
          remainingBlue,
          progress
        };
      });
    }
  };
});
