import React from 'react';
import PagerView from 'react-native-pager-view';
import { create } from 'zustand';

export interface MomentState {
	isCreatingMoment: boolean;
	setIsCreatingMoment: (isCreatingMoment: boolean) => void;
	isCreatingMomentStatusBarLight: boolean;
	setIsCreatingMomentStatusBarLight: (
		isCreatingMomentStatusBarLight: boolean
	) => void;
	pagerRefEvent: React.RefObject<PagerView>;
	setPagerRefEvent: (ref: React.RefObject<PagerView>) => void;
	controlledPageViewKey: number;
	setControlledPageViewKey: (key: number) => void;
}

export const useMomentStore = create<MomentState>()((set, get) => ({
	//@ts-ignore
	pagerRefEvent: React.createRef<PagerView>(),
	setPagerRefEvent: (pagerViewRef) => {
		set({ pagerRefEvent: pagerViewRef });
	},

	isCreatingMoment: false,
	setIsCreatingMoment: (isCreatingMoment) => {
		set({ isCreatingMoment });
	},
	isCreatingMomentStatusBarLight: true,
	setIsCreatingMomentStatusBarLight: (isCreatingMomentStatusBarLight) => {
		set({ isCreatingMomentStatusBarLight });
	},

	controlledPageViewKey: 100,
	setControlledPageViewKey: (key) => {
		set({ controlledPageViewKey: key });
	}
}));
