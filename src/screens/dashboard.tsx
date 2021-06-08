import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {DefaultText} from '../components/Text/DefaultText';
import Colors from '../constants/Colors';

export const Dashboard = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={dashboardStyles.container}>
        {/* <View>{renderContent()}</View> */}
      </View>
      {/* <View style={styles.dotRootContainer}>{renderDots()}</View> */}
    </SafeAreaView>
  );
};

export const dashboardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content_topic: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.RED,
    marginBottom: 42,
    marginTop: -64,
  },
  text: {
    fontSize: 18,
    padding: 8,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
