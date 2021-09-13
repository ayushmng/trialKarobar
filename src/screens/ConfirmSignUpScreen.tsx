import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch, useSelector} from 'react-redux';
import {confirmSignUp, resendVerificationCode} from '../redux/auth/action';
import {RootState} from '../redux/reducers';
import AuthRedButton from '../components/loginComponents/AuthRedButton';
import Colors from '../constants/Colors';
import {useTheme} from '@react-navigation/native';

interface Props {
  route: any;
  navigation: any;
}
const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 90;

export const VerificationScreen: React.FC<Props> = (props) => {
  const email = props.route.params.email;
  // const email = 'test@test.com';
  const resendLoading = useSelector(
    (state: RootState) => state.authReducer.resendLoading,
  );
  // const [code, setCode] = useState<string>('');
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [somevalue, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const authHandler = () => {
    // const {code} = values;
    if (value.length != 6) {
      return;
    }
    dispatch(
      confirmSignUp({
        email: email,
        code: value,
        navigation: props.navigation,
      }),
    );
  };

  const _onResend = () => {
    dispatch(
      resendVerificationCode({
        email: email,
      }),
    );
  };

  let resendOtpTimerInterval: any;

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  //to start resent otp option
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  //on click of resend button
  const onResendOtpButtonPress = () => {
    //clear input field
    // setValue('');
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    _onResend();
    console.log('todo: Resend OTP');
  };

  //declarations for input field
  // const [value, setValue] = useState('');
  // const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  // const [somevalue, getCellOnLayoutHandler] = useClearByFocusCell({
  //   value,
  //   setValue,
  // });

  //start timer on screen on launch
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  return (
    <SafeAreaView
      style={{...styles.root, backgroundColor: colors.backgroundColor}}>
      <Text style={{...styles.title, color: colors.textColor}}>
        Verify the Authorization Code
      </Text>
      <Text style={{...styles.subTitle, color: colors.textColor}}>
        Please check your email id
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        // onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{...styles.codeFieldRoot}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={{...styles.cellText, color: colors.textColor}}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {/* View for resend otp  */}
      {resendButtonDisabledTime > 0 ? (
        <Text style={{...styles.resendCodeText, color: colors.textColor}}>
          Resend Authorization Code in {resendButtonDisabledTime} sec
        </Text>
      ) : (
        <TouchableOpacity onPress={onResendOtpButtonPress}>
          <View style={styles.resendCodeContainer}>
            <Text style={styles.resendCode}> Resend Authorization Code</Text>
            <Text style={{marginTop: 40, color: colors.textColor}}>
              {' '}
              in {resendButtonDisabledTime} se
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {/* <View style={styles.button}> */}
      <AuthRedButton
        title="Verify"
        handleSubmit={authHandler}
        style={{marginTop: 42}}
        // externalLoading={true}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    marginStart: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 16,
    marginStart: 20,
    marginTop: 10,
  },
  codeFieldRoot: {
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },

  button: {
    marginTop: 20,
  },
  resendCode: {
    color: Colors.BLUE,
    marginStart: 20,
    marginTop: 40,
  },
  resendCodeText: {
    marginStart: 20,
    marginTop: 40,
  },
  resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
