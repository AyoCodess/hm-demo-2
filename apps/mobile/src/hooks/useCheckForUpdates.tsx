import { wait } from '@/lib/utils/wait';
import * as Updates from 'expo-updates';
import React from 'react';
import Toast from 'react-native-toast-message';

export function useCheckForUpdates() {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  React.useEffect(() => {
    const updateApp = async () => {
      if (isUpdatePending) {
        Toast.show({
          type: 'alertLong',
          text1: 'Downloaded update',
          text2: 'will restart in 5 seconds',
          autoHide: true
        });

        await wait(5250); // wait 5 seconds before reloading to show the toast for a bit

        try {
          await Updates.reloadAsync();
        } catch (err) {
          console.error('Error reloading app after update - ', err);
        }
      }
    };

    updateApp();
  }, [isUpdatePending]);

  // Show whether or not we are running embedded code or an update
  // const runTypeMessage = currentlyRunning.isEmbeddedLaunch
  //   ? 'This app is running from built-in code'
  //   : 'This app is running an update';
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch ? 'BC' : 'U';

  const checkForUpdateAsync = Updates.checkForUpdateAsync;
  const fetchUpdateAsync = Updates.fetchUpdateAsync;
  const reloadAsync = Updates.reloadAsync;

  return {
    showDownloadButton,
    currentlyRunning,
    isUpdatePending,
    runTypeMessage,
    checkForUpdateAsync,
    fetchUpdateAsync,
    reloadAsync
  };
}
