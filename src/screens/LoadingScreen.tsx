import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/reducers';
function LoadingScreen() {
  //   const theme = useSelector((state: RootState) => state.userReducer.theme);
  return (
    <View
      style={[
        styles.loadingScreen,
        {backgroundColor: '#FFF1E0'},
        // {backgroundColor: theme === 'dark' ? '#2B3240' : '#FFF1E0'},
      ]}>
      <ActivityIndicator
        size="large"
        color={'black'}
        // color={theme === 'dark' ? 'white' : 'black'}
      />
    </View>
  );
}

export default LoadingScreen;
const styles = StyleSheet.create({
  loadingScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
