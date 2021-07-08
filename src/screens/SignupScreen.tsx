import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {KarobarHeading} from '../components/KarobarHeading';
import {SignUpForm} from '../components/authComponents/SignUpForm';
import Colors from '../constants/Colors';
import {useTheme} from '@react-navigation/native';
interface Props {
  route: any;
  navigation: any;
}

const SignupScreen: React.FC<Props> = ({navigation, ...props}: Props) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.signUpScreen,
          backgroundColor: colors.backgroundColor,
        }}>
        <KarobarHeading />
        <View style={styles.signUpScreen_authContainer}>
          <SignUpForm navigation={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
  },

  signUpScreen_authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
  },
});
