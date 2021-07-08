import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';

interface FederatedIconProps {
  loginHandle: () => void;
  // imageUri?: string;
  children?: any;
}

export const FederatedIcon: React.FC<FederatedIconProps> = ({
  loginHandle,
  // imageUri,
  children,
}) => {
  return (
    <View style={styles.federatedIcon}>
      <TouchableNativeFeedback
        onPress={() => {
          loginHandle();
        }}>
        {children}
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  federatedIcon: {
    overflow: 'hidden',
    borderRadius: 360,
    padding: 10,
    width: 49,
    height: 49,
    backgroundColor: '#EEF1F7',
  },

  federatedIcon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  federatedIcon_image: {height: 25, width: 30},
});
