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
import {useSelector} from 'react-redux';
import {profileStyles} from '../../components/profileComponents/CardBox';
import {WidgetCard} from '../../components/profileComponents/WidgetCard';

export const Widget = () => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: colors.backgroundColor,
      }}>
      <Text
        style={{
          ...profileStyles.textBold,
          color: colors.textColor,
          padding: 8,
          margin: 8,
        }}>
        Widget 1
      </Text>
      <WidgetCard />
      <Text
        style={{
          ...profileStyles.textBold,
          color: colors.textColor,
          padding: 8,
          margin: 8,
        }}>
        Widget 2
      </Text>
      <WidgetCard />
      <Text
        style={{
          ...profileStyles.textBold,
          color: colors.textColor,
          padding: 8,
          margin: 8,
        }}>
        Widget 3
      </Text>
      <WidgetCard />
    </View>
  );
};
