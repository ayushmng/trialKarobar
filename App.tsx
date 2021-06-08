import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash, {Config} from 'react-native-bootsplash';
import OnBoardingScreen from './src/onBoardingScreen/OnBoardingScreen';
import LoadingScreen from './src/screens/LoadingScreen';
// import {createStackNavigator} from '@react-navigation/stack';

export const App = () => {
  // const Stack = createStackNavigator();
  const [boardingScreen, setBoardingScreen] = useState<null | boolean>(null);

  useEffect(() => {
    RNBootSplash.hide({duration: 250} as Config | undefined); // fade
  }, []);

  useEffect(() => {
    // dispatch(setUser());
    AsyncStorage.getItem('onboarding').then((val) => {
      if (!val) {
        setBoardingScreen(true);
      } else {
        setBoardingScreen(false);
      }
    });
  }, []);

  if (boardingScreen === null) {
    return <LoadingScreen />;
  } else if (boardingScreen === true) {
    return (
      <OnBoardingScreen setBoardingScreen={() => setBoardingScreen(false)} />
    );
  } else {
    return (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
  }
};
