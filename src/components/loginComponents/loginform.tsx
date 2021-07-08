import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../redux/auth/action';
import {KarobarHeading} from '../KarobarHeading';
import AuthRedButton from '../loginComponents/AuthRedButton';
import BottomAuthNav from '../authComponents/BottomAuthNav';
import HorizontalLineWord from '../HorizontalLineWord';
import {FederatedLogin} from '../loginComponents/FederatedLogin';
import InputField from '../loginComponents/InputField';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import {USER_KEY} from '../../redux/auth/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../../redux/user/reducer';
import {RootState} from '../../redux/reducers';
import {federatedSignInApi} from '../../api/auth';
import {useTheme} from '@react-navigation/native';

interface LoginFormProps {
  navigation: StackNavigationProp<any>;
  style?: {
    [key: string]: any;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const loginHandle = (values: any) => {
    dispatch(
      signIn({
        email: values.email,
        password: values.password,
        navigation: navigation,
      }),
    );
  };

  const {loginState} = useSelector((state: any) => state?.authReducer);
  const {userObj} = useSelector((state: RootState) => state?.authReducer);
  let uname = '';
  let username = loginState?.user?.email;
  let federatedUname = userObj?.signInUserSession?.idToken?.payload?.email;
  console.log('Username :', username);
  console.log('FederatedUname :', federatedUname);

  if (federatedUname === undefined) {
    uname = username;
  } else if (username === undefined) {
    uname = federatedUname;
  } else if (username === undefined && federatedSignInApi === undefined) {
    uname = 'N/A';
  }
  AsyncStorage.setItem(USER_KEY, uname);

  const signupScreen = () => {
    navigation.replace('Signup');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.loginScreen,
          backgroundColor: colors.backgroundColor,
        }}>
        <KarobarHeading />

        <View style={styles.loginScreen_authContainer}>
          {/* <LoginForm navigation={navigation} /> */}

          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.loginForm}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1, margin: 12}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled>
              <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => loginHandle(values)}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Email must be a valid email.')
                    .required()
                    .typeError('Email must be a valid email.'),
                  password: Yup.string()
                    .min(6, 'Password must be 6 characters long.')
                    .required('Password must be 6 characters long.')
                    .typeError('Password must be 6 characters long.'),
                })}>
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  handleSubmit,
                }) => (
                  <>
                    <InputField
                      field={'email'}
                      fieldHeading="Email"
                      values={values.email}
                      handleChange={handleChange}
                      setFieldTouched={setFieldTouched}
                      touched={touched.email!}
                      errors={errors.email}
                    />
                    <InputField
                      field={'password'}
                      fieldHeading={'Password'}
                      values={values.password}
                      handleChange={handleChange}
                      setFieldTouched={setFieldTouched}
                      touched={touched.password!}
                      errors={errors.password}
                      showSecureTextEntry
                    />

                    <View style={styles.loginForm_forgotPasswordContainer}>
                      <TouchableNativeFeedback onPress={() => {}}>
                        <Text
                          style={{
                            ...styles.loginForm_forgotPasswordText,
                            color: colors.textColor,
                          }}>
                          Forgot Password?
                        </Text>
                      </TouchableNativeFeedback>
                      <AuthRedButton
                        title="Log In"
                        handleSubmit={handleSubmit}
                        style={{flex: 1}}
                      />
                    </View>
                  </>
                )}
              </Formik>

              <HorizontalLineWord
                text="or login with"
                style={{marginVertical: 10}}
              />
              <View style={{marginTop: 20}} />
              <FederatedLogin />
              <View style={{marginTop: 20}} />
              <BottomAuthNav
                description="Don't have an account?"
                onNav={signupScreen}
                buttonTitle="Sign Up"
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    width: '90%',
  },
  loginScreen: {
    backgroundColor: Colors.Background,
    flex: 1,
  },

  loginScreen_authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginForm_forgotPasswordContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  loginForm_forgotPasswordText: {
    color: Colors.GREY_5,
    fontSize: 14,
    letterSpacing: 0.32,
    marginRight: '15%',
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },
});
