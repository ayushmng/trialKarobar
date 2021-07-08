import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {federatedSignIn} from '../../redux/auth/action';
import {FederatedIcon} from './FederatedIcon';
import AppleIcon from '../../assets/Icon_Apple.svg';
import GoogleIcon from '../../assets/Icon_Google.svg';
import FacebookIcon from '../../assets/Icon_Facebook.svg';

interface FederatedLoginProps {}

export const FederatedLogin: React.FC<FederatedLoginProps> = ({}) => {
  const dispatch = useDispatch();

  const googleloginHandle = () => {
    dispatch(federatedSignIn({provider: 'google'}));
  };
  const faceBookHangeloginHandle = () => {
    dispatch(federatedSignIn({provider: 'facebook'}));
  };
  const twitterHangeloginHandle = () => {
    dispatch(federatedSignIn({provider: 'Twitter'}));
  };
  const appleHangeloginHandle = () => {
    dispatch(federatedSignIn({provider: 'Apple'}));
  };

  return (
    <View style={styles.federatedLogin}>
      <FederatedIcon
        loginHandle={() => {
          googleloginHandle();
        }}>
        <GoogleIcon />
      </FederatedIcon>

      <FederatedIcon
        loginHandle={() => {
          faceBookHangeloginHandle();
        }}>
        <FacebookIcon />
      </FederatedIcon>
      {/* 
      <FederatedIcon
        loginHandle={() => {
          twitterHangeloginHandle();
        }} 
      > */}

      <FederatedIcon
        loginHandle={() => {
          appleHangeloginHandle();
        }}>
        <AppleIcon />
      </FederatedIcon>
    </View>
  );
};
const styles = StyleSheet.create({
  federatedLogin: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
