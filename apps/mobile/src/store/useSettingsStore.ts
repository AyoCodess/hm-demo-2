import { create } from 'zustand';

type TSettingsState = {
  [key: string]: boolean | undefined;
};

export interface SettingsState {
  notifications: TSettingsState;
  setNotifications: (notifications: TSettingsState) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  notifications: {
    allowPushNotification: false,
    partnerLogsBlueMoment: false,
    partnerLogsRedMoment: false,
    partnerLogsNeed: false,
    partnerEditsSavedMoment: false,
    relationshipSurveyReminder: false,
    relationshipReviewReminder: false,
    dailyLogReminder: false
  },
  setNotifications: (notifications) => {
    const {
      allowPushNotification,
      partnerLogsBlueMoment,
      partnerLogsRedMoment,
      partnerLogsNeed,
      partnerEditsSavedMoment,
      relationshipSurveyReminder,
      relationshipReviewReminder,
      dailyLogReminder
    } = notifications;
    set((state) => ({
      notifications: {
        allowPushNotification:
          allowPushNotification ?? state.notifications.allowPushNotification,
        partnerLogsBlueMoment:
          partnerLogsBlueMoment ?? state.notifications.partnerLogsBlueMoment,
        partnerLogsRedMoment:
          partnerLogsRedMoment ?? state.notifications.partnerLogsRedMoment,
        partnerLogsNeed: partnerLogsNeed ?? state.notifications.partnerLogsNeed,
        partnerEditsSavedMoment:
          partnerEditsSavedMoment ??
          state.notifications.partnerEditsSavedMoment,
        relationshipSurveyReminder:
          relationshipSurveyReminder ??
          state.notifications.relationshipSurveyReminder,
        relationshipReviewReminder:
          relationshipReviewReminder ??
          state.notifications.relationshipReviewReminder,
        dailyLogReminder:
          dailyLogReminder ?? state.notifications.dailyLogReminder
      }
    }));
  }
}));
