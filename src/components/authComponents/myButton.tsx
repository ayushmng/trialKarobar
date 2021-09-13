import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
} from 'react-native';
import {DefaultText} from '../components/Text/DefaultText';
import {styles} from '../../onBoardingScreen/OnBoardingScreen';
import Colors from '../../constants/Colors';

interface MyButtonProps {
  title: string;
  handleSubmit: (event: GestureResponderEvent) => void;
  style?: {
    [key: string]: any;
  };
  //   setIcon: boolean;
}

export const MyButton: React.FC<MyButtonProps> = ({
  title,
  handleSubmit,
  style,
}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        style={{
          // position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: Colors.RED,
          width: '100%',
          // width: Colors.windowWidth - 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          marginRight: 24,
        }}
        onPress={handleSubmit}>
        <Text style={{...styles.buttonText}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
