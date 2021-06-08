import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
// import {useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {OnBoardingScreen} from '../onBoardingScreen/OnBoardingScreen';
import {Dashboard} from '../screens/dashboard';
import {HeaderLeft} from '../components/headerComponents/HeaderLeft';
import {HeaderRight} from '../components/headerComponents/HeaderRight';

export const AppNavigation = () => {
  // const dispatch = useDispatch();
  // const [boardingScreen, setBoardingScreen] = useState<null | boolean>(null);
  const Stack = createStackNavigator();

  // const headerStyle = {
  //   title: 'Dashboard',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     //   backgroundColor: '#0a70c9',
  //   },
  // };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({navigation, route}: any) => ({
            headerShown: true,
            title: 'Home',
            headerTitle: () => null,
            headerRight: () => <HeaderRight navigation={navigation} />,
            headerLeft: () => <HeaderLeft />,
          })}
        />
      </Stack.Navigator>
    </>
  );
};
