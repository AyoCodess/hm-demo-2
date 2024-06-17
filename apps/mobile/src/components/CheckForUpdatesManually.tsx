import { useCheckForUpdates } from '@/hooks/useCheckForUpdates';
import { wait } from '@/lib/utils/wait';
import { theme } from 'rawTheme';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import packageJson from '../../package.json';
import { Feather } from '@expo/vector-icons';

export function CheckForUpdatesManually() {
  const [isPending, setIsPending] = React.useState(false);
  const { runTypeMessage, checkForUpdateAsync, fetchUpdateAsync, reloadAsync } =
    useCheckForUpdates();

  if (!process.env.EXPO_PUBLIC_APP_VARIANT) {
    Alert.alert('Error', 'APP_VARIANT is not set');
  }

  let AppName = process.env.EXPO_PUBLIC_APP_VARIANT;
  switch (AppName) {
    case 'development':
      AppName = '(Dev)';
      break;
    case 'staging':
      AppName = '(Beta)';
      break;
    case 'production':
      AppName = 'P';

      break;
    default:
      console.log('default');
      break;
  }

  async function handleCheckForUpdate() {
    try {
      setIsPending(true);
      const { isAvailable } = await checkForUpdateAsync();
      if (isAvailable) {
        const res = await fetchUpdateAsync();
        if (res.isNew) {
          // setIsPending(false);
          Toast.show({
            type: 'alertLong',
            text1: 'Downloaded update',
            text2: 'will restart in 5 seconds',
            visibilityTime: 5000,
            autoHide: true
          });

          await wait(5250);
          try {
            await reloadAsync();
          } catch (err) {
            console.error('Fetched update is not new or error');
          }
        }
      } else {
        Toast.show({
          type: 'alertShort',
          text1: 'No updates available'
        });
        console.log('No updates available');
        setIsPending(false);
      }
    } catch (err) {
      setIsPending(false);
      Toast.show({
        type: 'alertShort',
        text1: 'Error checking for updates'
      });
      console.error('Error checking for updates - ', err);
    }
  }

  return (
    <View className=" flex-col  mb-10 ">
      <TouchableOpacity
        className=" px-2 py-3  flex-row  gap-3 rounded-md"
        onPress={handleCheckForUpdate}>
        <Text className="text-lead rounded-md text-lg font-ggRegular ">
          Check for updates
        </Text>
        {isPending && (
          <ActivityIndicator size="small" color={theme.raw.colors.primary} />
        )}
        {!isPending && (
          <Feather name="download" size={24} color={theme.raw.colors.primary} />
        )}
      </TouchableOpacity>
      <Text className="px-2 text-lead">
        <Text className="text-lead rounded-md font-ggRegular  ">
          App Version:{' '}
        </Text>
        {packageJson.version} ({packageJson.updateVersion}) {runTypeMessage} -{' '}
        {AppName}
      </Text>
    </View>
  );
}
