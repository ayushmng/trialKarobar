import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import {CardBox} from '../../components/profileComponents/CardBox';
import {MyButton} from '../../components/authComponents/myButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation, useTheme} from '@react-navigation/native';
// import {LoginForm} from '../../components/loginComponents/loginform';
import {LoginForm} from '../../components/loginComponents/loginform';
import {USER_KEY} from '../../redux/auth/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {RootState} from '../../redux/reducers';
import {changeTheme} from '../../redux/user/action';
import {setUser, signOut} from '../../redux/auth/action';

const width = Colors.windowWidth - 64;

export const Profile = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => {
    return state.userReducer.theme;
  });
  console.log(currentTheme);
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
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...profileStyles.container,
        backgroundColor: colors.backgroundColor,
      }}>
      <View style={profileStyles.headingContainer}>
        <Text
          style={{
            ...profileStyles.textBold,
            color: colors.textColor,
          }}>
          Settings
        </Text>
      </View>
      <ScrollView>
        <View>
          <CardBox
            title="Theme"
            themeToggle={() => dispatch(changeTheme())}
            setIcon={true}
            // isEnable
          />
          <CardBox
            title="Push Notification"
            // toggleSwitch={() => toggleSwitch()}
            setIcon={false}
          />
          <CardBox
            title="Video AutoPlay"
            // toggleSwitch={() => toggleSwitch()}
            setIcon={false}
          />
          <CardBox title="Language" setIcon={false} />
          {!loggedIn && (
            <MyButton
              title={'Log In'}
              handleSubmit={() => {
                navigation.navigate('LoginForm');
              }}
              style={{marginTop: 68, zInex: 10}}
            />
          )}

          {loggedIn && (
            <MyButton
              title={'Log Out'}
              handleSubmit={() => {
                dispatch(signOut());
              }}
              style={{marginTop: 68, zInex: 10}}
            />
          )}

          <View style={profileStyles.footer}>
            <Text style={{color: colors.textColor}}> Follow us on</Text>
            <View style={profileStyles.footerLogoContainer}>
              <Pressable onPress={() => {}}>
                <MaterialCommunityIcons
                  name={'facebook'}
                  size={22}
                  color="#0084FF"
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <MaterialCommunityIcons
                  name={'twitter'}
                  color="#1DA1F2"
                  size={22}
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <MaterialCommunityIcons
                  name={'youtube'}
                  color={'#FF0000'}
                  size={22}
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Fontisto
                  name={'instagram'}
                  color={'black'}
                  size={20}
                  style={{backgroundColor: 'white'}}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingTop: 32,
    paddingLeft: 32,
    paddingBottom: 18,
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
