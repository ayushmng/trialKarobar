import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import {CardBox} from '../../components/profileComponents/CardBox';
import {MyButton} from '../../components/authComponents/myButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {profileStyles} from '../../navigation/bottomNavigation/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import {RootState} from '../../redux/reducers';
import {changeTheme} from '../../redux/user/action';
import {setUser, signOut} from '../../redux/auth/action';
import {useNavigation, useTheme} from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Settings: React.FC<Props> = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  //Checks login state
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn,
  );
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...profileStyles.container,
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
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <MyButton
              title={'Log In'}
              handleSubmit={() => {
                navigation.navigate('LoginForm');
              }}
              style={{marginTop: 48, zIndex: 10}}
            />
          </View>
        )}

        {loggedIn && (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <MyButton
              title={'Log Out'}
              handleSubmit={() => {
                dispatch(signOut());
              }}
              style={{marginTop: 48, zIndex: 10}}
            />
          </View>
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
    </View>
  );
};
