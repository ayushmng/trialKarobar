import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {LoginForm} from '../../components/loginComponents/loginform';
import {USER_KEY, UNAME_KEY} from '../../redux/auth/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {RootState} from '../../redux/reducers';
import {changeTheme} from '../../redux/user/action';
import {setUser, signOut} from '../../redux/auth/action';
import {Settings} from '../../components/profileComponents/Settings';
import {ProfileHeader} from '../../components/headerComponents/ProfileHeader';

const width = Colors.windowWidth - 64;

export const Profile = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  //Checks login state
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn,
  );
  //Reset User
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);
  if (loggedIn === false) {
    AsyncStorage.setItem(USER_KEY, 'N/A');
  }
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      {loggedIn && <ProfileHeader />}
      {!loggedIn && <Settings />}
    </View>
  );
};

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingTop: 28,
    paddingLeft: 28,
    paddingBottom: 28,
    alignItems: 'flex-start',
  },
  cardStyle: {
    height: 60,
    width: width,
    borderRadius: 10,
    marginLeft: 32,
    marginRight: 36,
    backgroundColor: Colors.GREY_1,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 8,
    marginTop: 16,
  },
  footerLogoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    width: '50%',
    justifyContent: 'space-evenly',
  },
});
