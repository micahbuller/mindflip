import React from 'react';
import { useFonts } from 'expo-font';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export default function Routes() {

  let [fontsLoaded] = useFonts({
    'Mon-Cheri': require('../assets/fonts/tan-mon-cheri.otf'),
    'Nanum-Gothic': require('../assets/fonts/NanumGothic-Bold.ttf'),
  });

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}