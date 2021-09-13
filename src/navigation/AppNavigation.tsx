import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {Dashboard} from '../screens/dashboard';
import {HeaderLeft} from '../components/headerComponents/HeaderLeft';
import {HeaderRight} from '../components/headerComponents/HeaderRight';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {News} from './bottomNavigation/News';
import {Widget} from './bottomNavigation/Widgets';
import {Profile} from './bottomNavigation/Profile';
import {LoginForm} from '../components/loginComponents/loginform';
import Colors from '../constants/Colors';
import SignupScreen from '../screens/SignupScreen';
import {
  ConfirmSignUpScreen,
  VerificationScreen,
} from '../screens/ConfirmSignUpScreen';
import {setUser} from '../redux/auth/action';
import {Hub} from 'aws-amplify';
import {State} from 'react-native-gesture-handler';
import {ForYou} from './bottomNavigation/For You';
import {ArticleScreen} from '../screens/ArticleScreen';
import {SearchScreen} from '../screens/SearchScreen';

export const AppNavigation = () => {
  const dispatch = useDispatch();
  // const [boardingScreen, setBoardingScreen] = useState<null | boolean>(null);
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn,
  );
  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  // const headerStyle = {
  //   title: 'Dashboard',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     //   backgroundColor: '#0a70c9',
  //   },
  // };

  const handleAuth = (data: any): any => {
    // const {payload} = data;
    // console.log('hub function is called', data);
    switch (data.payload.event) {
      case 'signIn':
        // props.navigation.pop();
        // console.log('index of navigation is ', index);
        // navigation sent from authScreen so when navigation.canGoBack function is called it pops the authscreen
        // as navigation reference is taken from authnavigation even when authReducer initialLoginLoading is true
        // which shows loading screen from the mainNavigation
        dispatch(setUser());
        break;
      case 'codeFlow':
        // codeFlow is the condition when using Federated login it redirect to app and takes abit time to
        // fetch the tokens from the webbrowser during that condition codeFlow is called
        // setFederatedLoading(true);
        console.log('Loading...');
        break;
      default:
        // setFederatedLoading(false);
        break;
    }
  };

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('hub is called');
    Hub.listen('auth', handleAuth);
    return () => {
      console.log('removed hub');
      Hub.remove('auth', handleAuth);
    };
  }, [dispatch, handleAuth]);

  const TabHome = () => {
    const {colors} = useTheme();
    return (
      <Tabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'For You') {
              iconName = 'home';
            } else if (route.name === 'News') {
              return <Entypo name={'news'} size={size} color={color} />;
            } else if (route.name === 'Widget') {
              iconName = 'widgets';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.tabIcon,
          inactiveTintColor: 'gray',
        }}>
        <Tabs.Screen name="For You" component={ForYou} />
        <Tabs.Screen name="News" component={News} />
        <Tabs.Screen name="Widget" component={Widget} />
        <Tabs.Screen name="Profile" component={Profile} />
      </Tabs.Navigator>
    );
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={TabHome}
          options={({navigation, route}: any) => ({
            headerShown: true,
            title: 'Home',
            headerTitle: () => null,
            headerRight: () => <HeaderRight navigation={navigation} />,
            headerLeft: () => <HeaderLeft />,
          })}
        />
        {!loggedIn && (
          <Stack.Screen
            options={({navigation, route}: any) => ({
              headerShown: false,
              headerTitle: () => null,
              headerStyle: {
                elevation: 0,
                shadowColor: 'transparent',
                shadowOpacity: 0,
              },
            })}
            name="LoginForm"
            component={LoginForm}
          />
        )}
        {!loggedIn && (
          <Stack.Screen
            options={({navigation, route}: any) => ({
              headerShown: false,
              headerTitle: () => null,
              headerStyle: {
                elevation: 0,
                shadowColor: 'transparent',
                shadowOpacity: 0,
              },
            })}
            name="Signup"
            component={SignupScreen}
          />
        )}
        <Stack.Screen
          options={({navigation, route}: any) => ({
            headerShown: false,
            headerTitle: () => null,
            headerStyle: {
              elevation: 0,
              shadowColor: 'transparent',
              shadowOpacity: 0,
            },
          })}
          name="ConfirmSignUp"
          component={VerificationScreen}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={({navigation, route}: any) => ({
            headerShown: true,
            title: 'Article',
            headerTitle: () => null,
          })}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({navigation, route}: any) => ({
            headerShown: false,
            title: 'SearchScreen',
            headerTitle: () => null,
          })}
        />
      </Stack.Navigator>
    </>
  );
};
