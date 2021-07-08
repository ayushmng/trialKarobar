import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
// import {ActivityIndicator} from 'react-native-paper';

interface LoadingIndicatorProps {}

export function LoadingIndicator({}: LoadingIndicatorProps) {
  const theme = useSelector((state: RootState) => state.userReducer.theme);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        size="large"
        color={theme === 'dark' ? 'white' : 'black'}
      />
    </View>
  );
}
