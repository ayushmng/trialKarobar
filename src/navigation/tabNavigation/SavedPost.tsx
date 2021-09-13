import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {useTheme} from '@react-navigation/native';

export const SavedPost = () => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
      <Text style={{color: colors.textColor, fontSize: 16}}>
        Hello from Saved Post tab
      </Text>
    </View>
  );
};
