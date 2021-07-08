import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import { useTheme } from '@react-navigation/native';

interface Props {
  field: string;
  fieldHeading?: string;
  values: string;
  handleChange: (text: string) => any;
  errors: any;
  setFieldTouched: (text: string) => void;
  touched: boolean;
  placeholderName?: string;
  showSecureTextEntry?: boolean;
  editable?: boolean;
  keyboardType?: any;
}

const InputField: React.FC<Props> = ({
  field,
  fieldHeading,
  values,
  handleChange,
  errors,
  setFieldTouched,
  touched,
  placeholderName,
  showSecureTextEntry,
  editable,
  keyboardType,
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  // const theme = useSelector((state: RootState) => state.userReducer.theme);

  const updateSecureTextEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };
  const {colors} = useTheme();
  return (
    <View style={styles.inputField}>
      {!!fieldHeading && (
        <Text style={[styles.text_heading, {color: colors.textColor}]}>
          {fieldHeading}
        </Text>
      )}
      <View
        style={
          errors === undefined && values !== ''
            ? {...styles.action, borderBottomColor: Colors.GREEN_Success}
            : touched && errors
            ? {...styles.action, borderBottomColor: Colors.RED_Error}
            : isActive
            ? {...styles.action, borderBottomColor: Colors.BLUE}
            : styles.action
        }>
        <TextInput
          style={[
            styles.textInput,
            {color: colors.textColor},
            Platform.OS === 'ios' ? {fontWeight: 'bold'} : {},
          ]}
          value={values}
          underlineColorAndroid={'transparent'}
          onFocus={() => setActive(true)}
          onChangeText={handleChange(`${field}`)}
          onBlur={() => {
            setFieldTouched(`${field}`);
            setActive(false);
          }}
          placeholder={!!placeholderName ? placeholderName : ''}
          autoCapitalize="none"
          secureTextEntry={showSecureTextEntry && secureTextEntry}
          keyboardType={keyboardType}
          editable={!!editable ? false : true}
          clearTextOnFocus={false}
        />
        {errors === undefined &&
        values !== '' &&
        field === 'email' &&
        values.length > 1 ? (
          <AntDesign
            name="checkcircle"
            color={Colors.GREEN_Success}
            size={20}
          />
        ) : null}
        {showSecureTextEntry && (
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.errorMsg}>{touched && errors}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 86.72,
    justifyContent: 'center',
  },
  text_heading: {
    color: Colors.Off_Black,
    fontSize: 16,
    letterSpacing: 0.32,
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },

  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY_4,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: Platform.OS === 'ios' ? 0 : -2,
    fontSize: 16,
    color: Colors.Off_Black,
    fontFamily: Platform.OS === 'android' ? 'ProximaNovaBold' : 'Proxima Nova',
  },

  errorMsg: {
    color: Colors.RED_Error,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },
});

export default InputField;
