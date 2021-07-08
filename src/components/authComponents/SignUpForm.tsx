import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/auth/action';
import InputField from '../loginComponents/InputField';
import AuthGreyButton from '../authComponents/AuthGreyButton';
import BottomAuthNav from '../authComponents/BottomAuthNav';
import {StackNavigationProp} from '@react-navigation/stack';
interface SignUpFormProps {
  navigation: StackNavigationProp<any>;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const loginScreen = () => {
    navigation.replace('LoginForm');
  };
  const signupHandle = (values: any) => {
    const {username, email, password} = values;
    dispatch(
      registerUser({
        username: username,
        email: email,
        password: password,
        navigation,
      }),
    );
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 230 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flexGrow: 1, width: '90%'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
          }}
          onSubmit={(values) => signupHandle(values)}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            confirmpassword: Yup.string()
              .nullable()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .min(6)
              .required(),
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
                field={'username'}
                fieldHeading={'Username'}
                values={values.username}
                handleChange={handleChange}
                setFieldTouched={setFieldTouched}
                touched={touched.username!}
                errors={errors.username}
              />
              <InputField
                field={'email'}
                fieldHeading={'Email'}
                values={values.email}
                handleChange={handleChange}
                setFieldTouched={setFieldTouched}
                touched={touched.email!}
                errors={errors.email}
              />
              <InputField
                field={'password'}
                fieldHeading="Password"
                values={values.password}
                handleChange={handleChange}
                setFieldTouched={setFieldTouched}
                touched={touched.password!}
                errors={errors.password}
                showSecureTextEntry
              />
              <InputField
                field={'confirmpassword'}
                fieldHeading="Re-type Password"
                values={values.confirmpassword}
                handleChange={handleChange}
                setFieldTouched={setFieldTouched}
                touched={touched.confirmpassword!}
                errors={errors.confirmpassword}
                showSecureTextEntry
              />
              <AuthGreyButton title="Sign up" handleSubmit={handleSubmit} />
            </>
          )}
        </Formik>
        <BottomAuthNav
          description="Already have an account? "
          onNav={loginScreen}
          buttonTitle="Log In"
          descpStyle={{
            fontFamily:
              Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
  },
  signUpScreen_authContainer: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  signUpScreen_authItemContainer: {
    width: '90%',
    // marginTop: 20,
  },
  signUpScreen_headingContainer: {width: '90%'},
  signUpScreen_headingText: {fontSize: 30, fontWeight: 'bold'},
});
