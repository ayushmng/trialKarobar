import React from 'react';
import {StyleSheet, View} from 'react-native';
import Karobar from '../assets/karobar.svg';

interface KarobarHeadingProps {}

export const KarobarHeading: React.FC<KarobarHeadingProps> = ({}) => {
  return (
    <View style={styles.karobar}>
      <Karobar />
    </View>
  );
};

const styles = StyleSheet.create({
  karobar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 95.98,
    marginBottom: 67.3,
  },
});
