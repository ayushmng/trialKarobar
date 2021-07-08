import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash, {Config} from 'react-native-bootsplash';
import OnBoardingScreen from './src/onBoardingScreen/OnBoardingScreen';
import configureAmplify from './src/api/amplify-configure';
import LoadingScreen from './src/screens/LoadingScreen';
import {Provider, useSelector} from 'react-redux';
import {storeObj as store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootState} from './src/redux/reducers';
import Colors from './src/constants/Colors';
import {linking} from './src/constants/DeeplinkingConfig';
// import {createStackNavigator} from '@react-navigation/stack';

configureAmplify();

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: '#404040',
    iconColor: 'white',
    tabIcon: 'white',
    textColor: 'white',
    backgroundColor: Colors.DarkBackground,
  },
};

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: 'white',
    iconColor: 'black',
    tabIcon: Colors.RED,
    textColor: Colors.Off_Black,
    backgroundColor: Colors.Background,
  },
};

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
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* <NavigationContainer> */}
        {/* </PersistGate> */}
        <Navigation />
      </Provider>
    );
  }
};

export function Navigation() {
  const currentTheme = useSelector((state: RootState) => {
    return state.userReducer.theme;
  });
  return (
    <NavigationContainer
      linking={linking}
      theme={currentTheme === 'dark' ? darkTheme : defaultTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}
