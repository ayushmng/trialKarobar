import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {USER_KEY} from '../../redux/auth/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export const Widget = () => {
  const {colors} = useTheme();
  const [username, setusername] = useState<string>();
  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((val) => {
      setusername(val);
    });
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
      }}>
      <Text style={{color: colors.textColor}}>This is Widget</Text>
      <Text style={{color: colors.textColor}}>Logged id: {username}</Text>
    </View>
  );
};
